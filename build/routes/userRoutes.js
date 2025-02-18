"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const valentineMeController_1 = __importDefault(require("../controllers/valentineMeController"));
const router = (0, express_1.Router)();
router.get("/users", userController_1.getAllUsers);
router.get("/users/:id", userController_1.getUserById);
router.get("/user", userController_1.getUserByToken);
router.post("/auth/signup", userController_1.signUpUser);
router.post("/auth/verify", userController_1.verifyUser);
router.post("/auth/verify/resend", userController_1.resendOTP);
router.post("/auth/login", userController_1.loginUser);
router.post("/auth/login/forgot", userController_1.sendPasswordResetEmail);
router.post("/auth/login/reset", userController_1.resetPassword);
router.put("/user/update", userController_1.updateUser);
router.delete("/deleteme", userController_1.deleteUser);
router.post("/valentine-me", valentineMeController_1.default);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map