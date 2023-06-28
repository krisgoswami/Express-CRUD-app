import express from "express";
import bodyParser from 'body-parser';
import usersRoute from './routes/users.js'

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    console.log('TEST');
    res.send("Hello from homepage");
})

//start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port: "http://localhost:${PORT}`));