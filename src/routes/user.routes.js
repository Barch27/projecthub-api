import { Router } from "express";

import * as userController from "../controllers/user.controller.js"


import { validate} from "../middleware/validate.middleware.js";

import { createUserSchema, updateUserSchema } from "../validators/user.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = Router();


router.post("/", 
    validate( createUserSchema ),
    userController.createUser
);

router.get("/", 
    authenticate,
    userController.getUsers
);

router.get("/:id", 
    authenticate,
    userController.getUserById
);

router.put("/:id", 
    authenticate,
    validate( updateUserSchema ),
    userController.updateUser
);

router.delete("/:id", 
    authenticate,
    userController.deleteUser
);

export default router;    