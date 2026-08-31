import { asyncHandler } from "../middleware/asyncHandler.js"
import * as authService from "../services/auth.service.js"

export const login = asyncHandler(async(req, res) => {
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        })

});