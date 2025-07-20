const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log(req.body);
    fs.writeFileSync('signal.json', JSON.stringify(req.body));
    res.send({ status: "Signal received." });
});

app.get('/signal', (req, res) => {
    try {
        const data = fs.readFileSync('signal.json');
        res.send(JSON.parse(data));
    } catch (e) {
        res.send({ signal: "none" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
