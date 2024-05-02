import express from 'express';
import router from './src/routes/index.js';
import { Server } from 'socket.io';

const port = 8080;
const ready = console.log(`Server ready on port ${port}`);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ready);
app.use('/api', router);
