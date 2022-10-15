import express, { Request, Response, Router } from "express";
import { soptMembers } from "../util/soptMember";
import { SoptMember } from "../util/soptMember";

const router: Router = express.Router();

const members: SoptMember[] = soptMembers;

router.get("/", (req: Request, res: Response) => {

    return res.status(200).json({
        status: 200,
        message: members.map((soptMember) => (
            {
                "name": soptMember.name,
                "mbti": soptMember.mbti       
            }
        ))
        
    });

});


module.exports = router;