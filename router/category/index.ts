import { PrismaClient, Prisma } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  async (req: Request<{}, {}, { user_id: number }>, res: Response) => {
    const { user_id } = req.body;

    const categoriesList = await prisma.category.findMany({
      where: { user_id },
      select: {
        category_id: true,
        name: true,
        tasks: {
          where: { status: true },
        },
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: {
        category_id: "asc",
      },
    });

    const list = categoriesList.map((category) => ({
      id: category.category_id,
      categoryName: category.name,
      tasks: {
        checked: category.tasks.length,
        total: category._count.tasks,
      },
    }));

    res.json(list);
  }
);
router.get(
  "/options",
  async (req: Request<{}, {}, { user_id: number }>, res: Response) => {
    const { user_id } = req.body;

    const categoriesList = await prisma.category.findMany({
      where: { user_id },
      select: {
        category_id: true,
        name: true,
      },
    });

    res.json(categoriesList);
  }
);

router.get(
  "/:category_id",
  async (
    req: Request<{ category_id: string }, {}, { user_id: number }>,
    res: Response
  ) => {
    const { category_id } = req.params;
    const { user_id } = req.body;
    const categoriesWithTaskCounts = await prisma.category.findMany({
      where: { user_id, category_id: Number(category_id) },
      select: {
        name: true,
        tasks: true,
        _count: true,
      },
    });
    res.json(categoriesWithTaskCounts);
  }
);

router.post(
  "/",
  async (
    req: Request<{}, {}, Prisma.CategoryCreateInput & { user_id: number }>,
    res: Response
  ) => {
    const { name, user_id } = req.body;
    const category = await prisma.category.create({
      data: {
        user_id,
        name,
      },
    });

    res.json(category);
  }
);

export default router;
