import { PrismaClient, Prisma } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  async (req: Request<{}, {}, { user_id: number }>, res: Response) => {
    const { user_id } = req.body;
    const getUserName = await prisma.user.findUnique({
      where: { user_id },
      select: {
        username: true,
      },
    });
    res.json(getUserName);
  }
);

router.post(
  "/",
  async (req: Request<{}, {}, Prisma.UserCreateInput>, res: Response) => {
    const { username, password } = req.body;
    const getUserName = await prisma.user.create({
      data: { username, password },
    });
    res.json(getUserName);
  }
);

export default router;
