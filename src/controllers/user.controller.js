import * as userService from "../services/user.service.js"
import { asyncHandler } from "../middleware/asyncHandler.js";   
import { ApiResponse } from "../utils/ApiResponse.js";
import { AR_OPERATIONS } from "redis";

export const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(201).json(
      new ApiResponse(
        201,
        "User created Successfully",
        user
      )
    );
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).json(
    new ApiResponse(
      200,
      "Users fetched successfully",
      users
    )
  );
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully",
      user
    )
  );
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "User updated successfully"
    )
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).send(
    new ApiResponse(
      200,
      "User deleted successfully"
    )
  );
});
