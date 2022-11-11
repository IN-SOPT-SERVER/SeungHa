import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
const createUser = async (userName: string, age: number, email: string) => {

  const user = await prisma.user.create({
    data: {
      userName,
      email,
      age
    }
  });

  return user;

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
  deleteUser
};

export default userService;
