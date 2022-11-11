import { Request, Response } from "express";
import { userService } from "../service";

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

const createUser = async (req:Request, res:Response) => {

  const { userName, age, email } = req.body;

  if (!userName) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패 - userName 없음" });
  }

  const data = await userService.createUser(userName, age, email);

  if (!data) {
    return res.status(404).json({ status: 400, message: "유저 생성 실패" });
  }
  return res.status(200).json({ status: 200, message: "유저 생성 성공", data });


  /*
    비구조화 할당

    request의 json이 
    {
      "name" : "이름",
      "age": 12
    }

    이런식으로 올 때 

    const { name, age } = req.body;

    이렇게 하면 req.body에 있는 동일한 키값을 가진 애를 변수에 넣어줌 
  */


};

const getAllUser = async (req:Request, res:Response) => {
  
  const data = await userService.getAllUser();

  return res.status(200).json({ status: 200, message: "전체 유저 조회 성공", data})

};

const updateUser = async (req:Request, res:Response) => {

  const { userName } = req.body;
  const { userId } = req.params;

  if (!userName) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패 - userName 없음" });
  }

  const updateUser = userService.updateUser(userName, +userId);

  return res.status(200).json({ status: 200, message: "유저 업데이트 성공"});

};

const deleteUser = async (req:Request, res:Response) => {

  const { userId } = req.params;

  userService.deleteUser(+userId);

  return res.status(204).json({ status: 200, message: "유저 삭제 성공"});


};



const userController = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};

export default userController;
