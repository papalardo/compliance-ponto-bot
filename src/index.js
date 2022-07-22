import express from 'express';
import env from 'dotenv';
import batePonto from "./bate-ponto.js";
env.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/fire', (req, res) => {
    const { email, password } = req.query
    batePonto(email, password)
        .then(() => {
            res.send({
                message: 'Ok'
            })
        })
        .catch((err) => {
            res.send({
                message: err
            })
        })
})

app.listen(app.get("port"), () => {
    console.log("App running on port", app.get("port"))
});