FROM python:3.10.4-slim

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
