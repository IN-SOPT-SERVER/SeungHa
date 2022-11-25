import { UserCreateDTO } from '../interfaces/user/UserCreateDTO';
import { UserSignInDTO } from '../interfaces/user/UserSignInDTO';
import { sc } from "../constants";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";


//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {

  const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화

  const data = await prisma.user.create({
    data: {
      userName: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return data;

};

const signIn = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//* 유저 전체 조회
const getAllUser = async () => {

  const allUser = await prisma.user.findMany();

  return allUser;
  
};

//* 유저 정보 업데이트
const updateUser = async (userName: string, userId: number) => {
  const data = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      userName: userName
    }

  })
};

//* 유저 삭제
const deleteUser = async (userId: number) => {

  await prisma.user.delete({
    where: {
      id: userId
    }
  });
};



const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signIn
};

export default userService;