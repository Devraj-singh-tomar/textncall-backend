import express from "express";
import { deleteUser, getUser, newUser } from "../controllers/userController.js";

const app = express.Router();

app.post("/new", newUser);

app.route("/:id").get(getUser).delete(deleteUser);

export default app;
