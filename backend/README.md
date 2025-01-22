# Neural Style Transfer - ADain

Implementation of a paper, Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization [Huang+, ICCV2017].

## Requirements
requirements:
- Python 3.11.8
- PyTorch newest
- TorchVision
- Pillow
- tqdm
- TensorboardX

## How to use backend (without web app)

### Generate
Use `--content` and `--style` to provide the respective path to the content and style image.
```
python test.py --content input/content/img1.jpg --style input/style/img2.jpg
```



