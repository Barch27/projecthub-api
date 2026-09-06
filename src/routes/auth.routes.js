import { Router } from "express";

import { validate } from "../middleware/validate.middleware.js";

import { loginSchema, 
    refreshTokenSchema,
 } from "../validators/auth.validator.js";

import * as authController from "../controllers/auth.controller.js"

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    authController.login
); 

router.post(
    "/refresh",
    validate(refreshTokenSchema),
    authController.refreshToken
);

router.post("/logout", 
    authController.logout
);

export default router;