import express from 'express';
import bodyParser from 'body-parser';
import users from './routes/users';
import groceryItems from './routes/groceryItems';
import orders from './routes/orders';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/groceryItems', groceryItems);
app.use('/api/orders', orders);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
