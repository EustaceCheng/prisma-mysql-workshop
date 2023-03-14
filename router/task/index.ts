import { PrismaClient, Prisma } from '@prisma/client';
import express, { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:task_id', async (req: Request<{ task_id: string }>, res: Response) => {
    const { task_id } = req.params;
    const taskWithUserAndCategory = await prisma.task.findUnique({
        where: { task_id: Number(task_id) },

        include: {
            user: {
                select: { username: true },
            },
            category: {
                select: { name: true },
            },
        },
    });
    res.json(taskWithUserAndCategory);
});

router.post(
    '/',
    async (
        req: Request<
            {},
            {},
            Prisma.TaskCreateInput & {
                category_id: number;
                user_id: number;
            }
        >,
        res: Response,
    ) => {
        const { description, priority, status, category_id, title, user_id, due_date } = req.body;
        const taskData: Prisma.TaskCreateInput = {
            title,
            user: {
                connect: {
                    user_id,
                },
            },
            category: {
                connect: {
                    category_id,
                },
            },
        };
        if (description) taskData.description = description;
        if (due_date) taskData.due_date = due_date;
        if (priority) taskData.priority = priority;
        if (status) taskData.status = status;

        const task = await prisma.task.create({
            data: taskData,
        });

        res.json(task);
    },
);

router.put(
    '/:task_id',
    async (
        req: Request<
            { task_id: string },
            {},
            Prisma.TaskUpdateInput & { category_id: number; user_id: number }
        >,
        res: Response,
    ) => {
        const { task_id } = req.params;
        const { description, priority, status, title, due_date, user_id, category_id } = req.body;
        const taskData: Prisma.TaskUpdateInput = {
            title,
            user: {
                connect: {
                    user_id,
                },
            },
            category: {
                connect: {
                    category_id,
                },
            },
        };
        if (description) taskData.description = description;
        if (due_date) taskData.due_date = due_date;
        if (priority) taskData.priority = priority;
        if (status) taskData.status = status;

        const taskWithUserAndCategory = await prisma.task.update({
            where: { task_id: Number(task_id) },
            data: taskData,
        });
        res.json(taskWithUserAndCategory);
    },
);

export default router;
