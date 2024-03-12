const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// leitura de json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// usando build do react
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

require("../server/app/routes/routes.js")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});