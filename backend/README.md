# Neural Style Transfer - ADain

Implementation of a paper, Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization [Huang+, ICCV2017](https://arxiv.org/abs/1703.06868).

## Requirements:
- Python 3.11.8
- PyTorch newest
- TorchVision
- Pillow
- tqdm
- TensorboardX

## Installation using Conda:
```bash
conda env create -f environment.yml
```

## Running:
```bash
uvicorn server:app --reload
```
## How to use backend (without web app)

### Generate

Use `--content` and `--style` to provide the respective path to the content and style image.

```
python generate.py --content input/images/blonde_girl.jpg --style input/styles/woman_in_peasant_dress_cropped.jpg
```
