import { UserCreateDTO } from '../interfaces/user/UserCreateDTO';
import { UserSignInDTO } from '../interfaces/user/UserSignInDTO';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userService } from "../service";
import { sc, rm } from "../constants";
import { fail, success } from '../constants/response';
import jwtHandler from "../modules/jwtHandler";


const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

const createUser = async (req:Request, res:Response) => {

  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
  }
  const userCreateDto: UserCreateDTO = req.body;

  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNUP_FAIL));
  }

  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.userName,
    accessToken,
  };

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));

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

const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const userId = await userService.signIn(userSignInDto);

    if (!userId) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (userId === sc.UNAUTHORIZED)
      return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(userId);

    const result = {
      id: userId,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

const getAllUser = async (req:Request, res:Response) => {
  
  const { page } = req.query;
  const { limit } = req.query;

  const data = await userService.getAllUser(Number(page), Number(limit)); // +랑 Number()랑 무슨차이인지?? +로 하면 에러나던데

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

// GET ~/api/user?keyword = Dan
const searchUserByName = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  const { option } = req.query;

  const data = await userService.searchUserByName(keyword as string, option as string);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
}



const userController = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signInUser,
  searchUserByName,
};

export default userController;
