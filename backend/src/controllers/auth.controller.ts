import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: String(req.headers["user-agent"] || ""),
  });

  // remove confirmPassword before passing to service
  const { confirmPassword, ...accountData } = request;

  const { user, accessToken, refreshToken } = await createAccount(accountData);

  setAuthCookies({ res, accessToken, refreshToken });

  return res.status(CREATED).json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: String(req.headers["user-agent"] || ""),
  });

  const { accessToken, refreshToken } = await loginUser(request);
  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(OK).json({
    message: "Login successful",
  });
});
