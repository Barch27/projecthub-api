import prisma from "../prisma/client.js";

export const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

export const getUsers = () => {
  return prisma.user.findMany({
    orderBy: {
        createdAt: "desc"
    }
  });
};

export const getUserById = (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateUser = (id, userData) => {
  return prisma.user.update({
    where: {
      id: Number(id),
    },
    data: userData,
  });
};

export const deleteUser = (id) => {
  return prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};