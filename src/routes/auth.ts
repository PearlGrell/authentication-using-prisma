import { create } from "../api/auth/signup";
import { login } from "../api/auth/login";
import { verify } from "../api/auth/verify";
import { resendOTP } from "../api/auth/verify";
import { forgotPassword } from "../api/auth/forgot_password";
import { resetPassword } from "../api/auth/reset_password";

export { create, verify, login, resendOTP, forgotPassword, resetPassword };