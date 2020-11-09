const express = require('express');
const app = express();
const port = 4000

app.use(express.static('publicSitoHacker'));

app.listen(port, () => {
    console.log(`SitoHacker listening at http://localhost:${port}`)
})