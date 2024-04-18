// this is the main app
import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import UserRoutes from './Kanbas/Users/routes.js';
import "dotenv/config";

import cors from "cors";
import session from "express-session";

// const express = require('express');
// const cors = require('cors');

// const DB_CONNECTION_STRING = "mongodb+srv://gudlavalletis:Sg910277!@cluster0.r3m6g77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

// app.use(cors());



app.use(express.json());
ModuleRoutes(app);

CourseRoutes(app);

app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

// app.use(
//     session(sessionOptions)
// );


Lab5(app);
Hello(app)
UserRoutes(app);

app.listen(process.env.PORT || 4000);
// app.listen(4000, () => {
//     console.log('Server running on port 4000');
//   });

