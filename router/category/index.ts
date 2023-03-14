import { PrismaClient, Prisma } from '@prisma/client';
import express, { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res: Response) => {
    const user_id = Number(req.query.user_id);
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
            category_id: 'asc',
        },
    });

    const list = categoriesList.map(category => ({
        id: category.category_id,
        categoryName: category.name,
        tasks: {
            checked: category.tasks.length,
            total: category._count.tasks,
        },
    }));

    res.json(list);
});
router.get('/options', async (req, res: Response) => {
    const user_id = Number(req.query.user_id);

    const categoriesList = await prisma.category.findMany({
        where: { user_id },
        select: {
            category_id: true,
            name: true,
        },
    });

    res.json(categoriesList);
});

router.get('/detail', async (req, res: Response) => {
    const category_id = Number(req.query.category_id);
    const user_id = Number(req.query.user_id);

    const categoriesWithTaskCounts = await prisma.category.findMany({
        where: { user_id, category_id },
        select: {
            name: true,
            tasks: true,
            _count: true,
        },
    });
    res.json(categoriesWithTaskCounts);
});

router.post(
    '/',
    async (
        req: Request<{}, {}, Prisma.CategoryCreateInput & { user_id: number }>,
        res: Response,
    ) => {
        const { name, user_id } = req.body;
        const category = await prisma.category.create({
            data: {
                user_id,
                name,
            },
        });

        res.json(category);
    },
);

export default router;
