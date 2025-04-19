FROM continuumio/miniconda3:latest

WORKDIR /app

COPY environment.yml .

RUN conda env create -f environment.yml

COPY train.py server.py neural_net.py generate_functional.py auto_sampler.py ./
COPY models/ models/

ENV PATH="/opt/conda/envs/transfer-style/bin:$PATH"

EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
