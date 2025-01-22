from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import StreamingResponse
from pathlib import Path
from tempfile import TemporaryDirectory
from generate_functional import run_style_transfer  # Import your refactored function
import io

app = FastAPI()


@app.post("/style-transfer/")
async def style_transfer_api(
    content_image: UploadFile,
    style_image: UploadFile,
    content_size: int = Form(512),
    style_size: int = Form(512),
    crop: bool = Form(False),
):
    with TemporaryDirectory() as temp_dir:
        # Save uploaded files
        content_path = Path(temp_dir) / content_image.filename
        style_path = Path(temp_dir) / style_image.filename
        with open(content_path, "wb") as f:
            f.write(await content_image.read())
        with open(style_path, "wb") as f:
            f.write(await style_image.read())

        # Run style transfer
        output_path = run_style_transfer(
            str(content_path),
            str(style_path),
            temp_dir,
            content_size,
            style_size,
            crop,
        )

        # Read the image as bytes
        with open(output_path, "rb") as output_file:
            image_bytes = output_file.read()

        # Send the image as a blob (binary response)
        return StreamingResponse(io.BytesIO(image_bytes), media_type="image/jpeg")
