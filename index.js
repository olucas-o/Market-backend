import express from "express";
import routers from './src/routers/index.js';

const app = express();

app.use(express.json());
app.use(routers)

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});