import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/login", (req, res) => {
    res.send("Login sucessful");
})
router.get("/logout", (req, res) => {
    res.send("Logout sucessful");
})

export default router;