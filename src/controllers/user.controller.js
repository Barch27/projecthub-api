import * as userService from "../services/user.service.js"

export const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
}

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(204).send();
};
