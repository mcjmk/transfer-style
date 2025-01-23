import argparse
from pathlib import Path
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from torchvision.utils import save_image
import neural_net as nn_module
from neural_net import adaptive_instance_normalization as adain


# Function to define the image transformation pipeline
def transform_pipeline(image_size, do_crop):
    pipeline = []
    if image_size != 0:
        # Resize the image if a non-zero size is specified
        pipeline.append(transforms.Resize(image_size))
    if do_crop:
        # Apply center cropping if enabled
        pipeline.append(transforms.CenterCrop(image_size))
    # Convert the image to a tensor
    pipeline.append(transforms.ToTensor())
    return transforms.Compose(pipeline)


# Function to perform style transfer
def transfer_style(
    vgg_model, decoder_model, content_img, style_img, interp_weights=None
):
    # Extract features from the content and style images using the VGG model
    content_features = vgg_model(content_img)
    style_features = vgg_model(style_img)
    if interp_weights:
        # Handle interpolation if weights are provided
        _, channels, height, width = content_features.size()
        blended_features = torch.zeros(1, channels, height, width, device=device)
        base_features = adain(content_features, style_features)
        for idx, weight in enumerate(interp_weights):
            # Blend features using interpolation weights
            blended_features += weight * base_features[idx : idx + 1]
        content_features = content_features[0:1]
    else:
        # Perform adaptive instance normalization for style transfer
        blended_features = adain(content_features, style_features)
    return decoder_model(blended_features)


# Argument parser to handle command-line inputs
arg_parser = argparse.ArgumentParser()
# Input options
arg_parser.add_argument("--content", type=str, help="Path to the content image")
arg_parser.add_argument(
    "--content_dir", type=str, help="Path to a directory of content images"
)
arg_parser.add_argument("--style", type=str, help="Path to the style image(s)")
arg_parser.add_argument(
    "--style_dir", type=str, help="Path to a directory of style images"
)
arg_parser.add_argument("--vgg", type=str, default="models/vgg_normalised.pth")
arg_parser.add_argument("--decoder", type=str, default="models/decoder_light.pth.tar")

# Additional options
arg_parser.add_argument(
    "--content_size",
    type=int,
    default=512,
    help="Resize content image (set 0 to keep original size)",
)
arg_parser.add_argument(
    "--style_size",
    type=int,
    default=512,
    help="Resize style image (set 0 to keep original size)",
)
arg_parser.add_argument("--crop", action="store_true", help="Apply center cropping")
arg_parser.add_argument(
    "--save_ext", default=".jpg", help="Output image file extension"
)
arg_parser.add_argument(
    "--output", type=str, default="output", help="Directory for saving output images"
)

# Parse the command-line arguments
args = arg_parser.parse_args()

# Flag to check if interpolation is enabled
interp_flag = False
# Determine the device to use (GPU if available, otherwise CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Create the output directory if it doesn't exist
output_folder = Path(args.output)
output_folder.mkdir(exist_ok=True, parents=True)

# Ensure either a content image or directory is specified
assert args.content or args.content_dir, "Content image or directory must be specified."
if args.content:
    # Use a single content image
    content_files = [Path(args.content)]
else:
    # Use all images in the specified content directory
    content_folder = Path(args.content_dir)
    content_files = list(content_folder.glob("*"))

# Ensure either a style image or directory is specified
assert args.style or args.style_dir, "Style image or directory must be specified."
if args.style:
    # Parse the style image(s)
    style_files = args.style.split(",")
    if len(style_files) == 1:
        # Single style image
        style_files = [Path(args.style)]
    else:
        # Raise an error for multiple style files
        raise ValueError("Only one style image file can be provided.")
else:
    # Use all images in the specified style directory
    style_folder = Path(args.style_dir)
    style_files = list(style_folder.glob("*"))

# Load the pre-trained decoder and VGG models
decoder_model = nn_module.decoder
vgg_model = nn_module.vgg

# Set both models to evaluation mode
decoder_model.eval()
vgg_model.eval()

# Load the pre-trained model weights
decoder_model.load_state_dict(torch.load(args.decoder, weights_only=True))
vgg_model.load_state_dict(torch.load(args.vgg, weights_only=True))

# Extract the first 31 layers of the VGG model for feature extraction
vgg_model = nn.Sequential(*list(vgg_model.children())[:31])

# Move models to the selected device (GPU/CPU)
vgg_model.to(device)
decoder_model.to(device)

# Define the transformation pipelines for content and style images
content_transform = transform_pipeline(args.content_size, args.crop)
style_transform = transform_pipeline(args.style_size, args.crop)

# Loop through each content and style image pair
for content_file in content_files:
    for style_file in style_files:
        # Load and transform the content image
        content_image = (
            content_transform(Image.open(str(content_file))).to(device).unsqueeze(0)
        )
        # Load and transform the style image
        style_image = (
            style_transform(Image.open(str(style_file))).to(device).unsqueeze(0)
        )
        with torch.no_grad():
            # Perform style transfer
            stylized_output = transfer_style(
                vgg_model, decoder_model, content_image, style_image
            )
        stylized_output = stylized_output.cpu()

        # Save the output stylized image
        output_filename = (
            output_folder
            / f"{content_file.stem}_stylized_{style_file.stem}{args.save_ext}"
        )
        save_image(stylized_output, str(output_filename))
