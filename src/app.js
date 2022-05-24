const express = require('express');
const env = require('./config/env');
const userRouter = require('./router/userRouter');

const app = express();
const port = env.PORT;

app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('Server started on port '+port+'.');
});