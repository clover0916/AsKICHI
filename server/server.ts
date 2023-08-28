import next from 'next';
import express from 'express';
import cron from 'node-cron';
import * as tasks from './schedule/scheduledTasks';
import schedules from './schedule/schedules.json';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

schedules.forEach(schedule => {
    const Func = (tasks as any)[schedule.function];
    if (Func) {
        cron.schedule(schedule.time, Func);
    }
});

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // for dev
    server.listen(3000, (err?: any) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:3000');
    });
});