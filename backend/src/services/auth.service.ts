import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import verificationCodeType from "../constants/verificationCodeType";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model";
import verificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
  userAgent: string;
  email: string;
  password: string;
  authAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user doesnt exist
  const existingUser = await userModel.exists({
    email: data.email,
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // create user
  const user = await userModel.create({
    email: data.email,
    password: data.password,
  });
  // create verification code
  const verifaicationCode = await verificationCodeModel.create({
    userId: user._id,
    type: verificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verifaction email

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });
  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    },
  );

  const accessToken = jwt.sign(
    {
      userId: user._id,
      sessionId: session._id,
    },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    },
  );
  // return user & tokens
  return {
    accessToken,
    refreshToken,
    user,
  };
};
