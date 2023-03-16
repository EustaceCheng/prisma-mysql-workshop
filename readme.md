# Prisma-MySQL-Workshop

## require
- [docker](https://www.docker.com/products/docker-desktop/)
- [insomnia](https://insomnia.rest/download)
- [mysql workbench](https://dev.mysql.com/downloads/workbench/)

## install mysql with docker

build docker

```
docker build -t mysql-docker .
```

run container

```
docker run --name mysql-container -p 3307:3306 -d mysql-docker
```

the container will run on 3307 port

## open log
```
SET GLOBAL general_log = 'ON';
```

## check log path
```
SHOW VARIABLES LIKE 'general_log%'
```

## install package

```
yarn install
```

## setup env file

follow .env.example to set up

## import Insomnia json

## run migrate

```
yarn migrate
```

## run project

```
yarn dev
```

## run studio

```
yarn studio
```
