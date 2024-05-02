import express from 'express';
import router from './src/routes/index.js';
import handlebars from 'express-handlebars';

const port = 8080;
const ready = console.log(`Server ready on port ${port}`);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());

app.listen(port, ready);
app.use('/api', router);
