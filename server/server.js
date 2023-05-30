const express = require('express');
const superheroesRouters = require('./routes');

const app = express();
const port = 3002;

var cors = require('cors');
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use('/superheroes', superheroesRouters);

app.listen(port, () => console.log(`app listening on port ${port}`));