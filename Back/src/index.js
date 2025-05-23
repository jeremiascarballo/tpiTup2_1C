import express from 'express';
import { sequelize } from './db.js';
import movieRoutes from './routes/movies.route.js';
import userRoutes from './routes/user.route.js';
import "dotenv/config"

const app = express();


try {
    app.use(express.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    })
    app.listen(3000);
    app.use(movieRoutes);
    app.use(userRoutes);

    await sequelize.sync();

    console.log(`Server listening in port: 3000`);
} catch (error) {
    console.log("There was an error on initialization");
}