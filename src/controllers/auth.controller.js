import * as authService from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const tokens = await authService.refreshUserToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // We will implement Redis logout in Lesson 2.6.
    const { refreshToken } = req.body;

    await authService.logoutUser(refreshToken);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};