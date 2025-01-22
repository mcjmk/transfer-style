# rewrite of generare.py to make it a bit more modal

import argparse
from pathlib import Path
import torch
from PIL import Image
from torchvision import transforms
from torchvision.utils import save_image
import neural_net as nn_module
from neural_net import adaptive_instance_normalization as adain


def transform_pipeline(image_size, do_crop):
    pipeline = []
    if image_size != 0:
        pipeline.append(transforms.Resize(image_size))
    if do_crop:
        pipeline.append(transforms.CenterCrop(image_size))
    pipeline.append(transforms.ToTensor())
    return transforms.Compose(pipeline)


def transfer_style(
    vgg_model, decoder_model, content_img, style_img, interp_weights=None
):
    content_features = vgg_model(content_img)
    style_features = vgg_model(style_img)
    if interp_weights:
        _, channels, height, width = content_features.size()
        blended_features = torch.zeros(
            1, channels, height, width, device=content_img.device
        )
        base_features = adain(content_features, style_features)
        for idx, weight in enumerate(interp_weights):
            blended_features += weight * base_features[idx : idx + 1]
        content_features = content_features[0:1]
    else:
        blended_features = adain(content_features, style_features)
    return decoder_model(blended_features)


def run_style_transfer(
    content_path, style_path, output_dir, content_size=512, style_size=512, crop=False
):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load the models
    decoder_model = nn_module.decoder
    vgg_model = nn_module.vgg
    decoder_model.eval()
    vgg_model.eval()

    decoder_model.load_state_dict(torch.load("models/decoder.pth", weights_only=True))
    vgg_model.load_state_dict(
        torch.load("models/vgg_normalised.pth", weights_only=True)
    )
    vgg_model = torch.nn.Sequential(*list(vgg_model.children())[:31])
    vgg_model.to(device)
    decoder_model.to(device)

    # Define transformations
    content_transform = transform_pipeline(content_size, crop)
    style_transform = transform_pipeline(style_size, crop)

    # Prepare images
    content_image = content_transform(Image.open(content_path)).to(device).unsqueeze(0)
    style_image = style_transform(Image.open(style_path)).to(device).unsqueeze(0)

    # Perform style transfer
    with torch.no_grad():
        stylized_output = transfer_style(
            vgg_model, decoder_model, content_image, style_image
        )
    stylized_output = stylized_output.cpu()

    # Save the result
    output_path = (
        Path(output_dir)
        / f"stylized_{Path(content_path).stem}_{Path(style_path).stem}.jpg"
    )
    save_image(stylized_output, str(output_path))

    return str(output_path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--content", type=str, required=True, help="Path to the content image"
    )
    parser.add_argument(
        "--style", type=str, required=True, help="Path to the style image"
    )
    parser.add_argument("--output", type=str, default="output", help="Output directory")
    parser.add_argument(
        "--content_size", type=int, default=512, help="Content image size"
    )
    parser.add_argument("--style_size", type=int, default=512, help="Style image size")
    parser.add_argument("--crop", action="store_true", help="Apply center cropping")
    args = parser.parse_args()

    output = run_style_transfer(
        args.content,
        args.style,
        args.output,
        args.content_size,
        args.style_size,
        args.crop,
    )
    print(f"Stylized image saved at: {output}")


if __name__ == "__main__":
    main()
