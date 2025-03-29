# Neural Style Transfer - ADain

Implementation of a paper, Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization [Huang+, ICCV2017](https://arxiv.org/abs/1703.06868).

## Prerequisites

### Conda installed:
   - [Miniconda](https://docs.conda.io/en/latest/miniconda.html) (lighter version)
   - [Anaconda](https://www.anaconda.com/download) (full version)

## Setup

### Installation using Conda:
```bash
# Create conda environment from environment.yml
conda env create -f environment.yml

# Activate the environment
conda activate transfer-style
```

### Running the Server
```bash
uvicorn server:app --reload
```

## How to use backend (without web app)

### Generate

Use `--content` and `--style` to provide the respective path to the content and style image.
```bash
python generate.py --content path/to/content.jpg --style path/to/style.jpg
```
Example: 
```bash
python generate_functional.py --content input/images/blonde_girl.jpg --style input/styles/woman_in_peasant_dress_cropped.jpg
```
