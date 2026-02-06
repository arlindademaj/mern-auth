import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = z
  .object({
    email: z.string().email().min(5).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"], // fixed
  });

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
