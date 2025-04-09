FROM postgres:16
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=MovieBooker
EXPOSE 5432

docker build -t postgres . && docker run -d --name postgres -p 5432:5432 postgres