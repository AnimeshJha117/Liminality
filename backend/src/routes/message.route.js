import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("Message sent");
});

router.get("/recieve", (req, res) => {
    res.send("Message recieved");
});

export default router;