import { PrismaClient, Prisma } from "@prisma/client";
import express, { Request, Response } from "express";
import category from "./router/category";
import task from "./router/task";
import user from "./router/user";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.use("/category", category);
app.use("/task", task);

app.use("/user", user);

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
