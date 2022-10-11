import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: "코멘트입니다~~~~~~~"
    });
});

module.exports = router;