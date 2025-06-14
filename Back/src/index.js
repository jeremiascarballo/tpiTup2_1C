import express from 'express';
import { sequelize } from './db.js';
import movieRoutes from './routes/movies.route.js';
import userRoutes from './routes/user.route.js';
import functionRoutes from './routes/functions.routes.js'
import purchaseRoutes from './routes/purchase.routes.js'

import { User } from './model/user.js';
import { FunctionCinema } from './model/function.js';
import { Purchase } from './model/pucharse.js';

import "dotenv/config"

const models = { User, FunctionCinema, Purchase };
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
    app.use(functionRoutes);
    app.use(purchaseRoutes);

    await sequelize.sync();

    Object.values(models).forEach(model => {
        if (model.associate) {
          model.associate(models);
        }
      });

    console.log(`Server listening in port: 3000`);
} catch (error) {
    console.log("There was an error on initialization");
}