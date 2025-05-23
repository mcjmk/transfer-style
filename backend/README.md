# Neural Style Transfer - ADain

Implementation of a paper, Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization [Huang+, ICCV2017](https://arxiv.org/abs/1703.06868).

## Prerequisites

### Conda installed

- [Miniconda](https://docs.conda.io/en/latest/miniconda.html) (lighter version)
- [Anaconda](https://www.anaconda.com/download) (full version)

## Setup

### Installation using Conda

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

### Running with Docker

```bash
# Build the Docker image
docker build -t transfer-style-backend .

# Run the container
docker run -p 8000:8000 transfer-style-backend
```

## How to use backend (without web app)

### Generate

Use `--content` and `--style` to provide the respective path to the content and style image.

Example:

```bash
python generate_functional.py --content input/images/blonde_girl.jpg --style input/styles/woman_in_peasant_dress_cropped.jpg
```
