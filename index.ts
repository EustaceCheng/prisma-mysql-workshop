import express from 'express';
import category from './router/category';
import task from './router/task';
import user from './router/user';

const app = express();
app.use(express.json());

app.use('/category', category);
app.use('/task', task);
app.use('/user', user);

app.listen(3001, () => {
    console.log('SERVER RUNNING ON PORT 3001');
});
