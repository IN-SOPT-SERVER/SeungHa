import express, { Router } from "express";

const router: Router = express.Router();

router.use("/blog", require("./blog"));
router.use("/comment", require("./comment"));
router.use("/movie", require("./movie"));
router.use("/member", require("./member"));

module.exports = router;