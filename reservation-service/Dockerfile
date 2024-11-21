FROM golang:1.21.4

WORKDIR /app

# Installation des dépendances nécessaires
RUN apt-get update && apt-get install -y postgresql-client

# pre-copy/cache go.mod for pre-downloading dependencies
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copier le fichier .env
COPY .env ./

# Copier le reste des fichiers
COPY . .
RUN go build -v -o main .

EXPOSE 3003

CMD ["/app/main"]