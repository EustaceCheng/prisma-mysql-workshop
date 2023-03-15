# Prisma_Test

## install mysql with docker

```
docker build -t mysql-docker .
docker run --name mysql-container -p 3307:3306 -d mysql-docker
```

the container will run on 3307 port

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
