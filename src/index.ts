import express from 'express'; 
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import  cors  from 'cors';

const app: Express = express();
const port = 8080;

app.use(express.json()); 
app.use(cors());
const prisma = new PrismaClient();

app.get('/allTodos',async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
});

app.post('/createTodo',async (req: Request, res: Response) => {
    try {
        const { title, isCompleted } = req.body;
        const createTodo = await prisma.todo.create({
            data: {
                title,
                isCompleted,
            }
        });     
        return res.json(createTodo);  
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Something went wrong[create]' });
    }
});

app.put('/editTodo/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, isCompleted } = req.body;
        const editTodo = await prisma.todo.update({
            where: { id },
            data: {
                title,
                isCompleted,
            }
        });     
        return res.json(editTodo);  
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Something went wrong[edit]' });
    }
});

app.delete('/deleteTodo/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleteTodo = await prisma.todo.delete({
            where: { id },
        });     
        return res.json(deleteTodo);  
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Something went wrong[delete]' });
    }
});

app.listen(port, () => console.log(`Server is running🚀 on port ${port}`));