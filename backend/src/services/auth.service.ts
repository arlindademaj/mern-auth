import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import verificationCodeType from "../constants/verificationCodeType";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model";
import verificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAsert";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

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
  appAssert(!existingUser, CONFLICT, "Email already in use");

  // create user
  const user = await userModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  // create verification code
  const verifaicationCode = await verificationCodeModel.create({
    userId,
    type: verificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verifaction email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });
  // sign access token & refresh token
  const refreshToken = signToken({ sessionId: session._id });

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });
  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
export type LoginParams = {
  userAgent: string;
  email: string;
  password: string;
  authAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get the user email
  const user = await userModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  // validate the password from the request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  // create a session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };
  // sign access token & refresh token

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  jwt.sign(sessionInfo, JWT_REFRESH_SECRET, {
    audience: ["user"],
    expiresIn: "30d",
  });

  const accessToken = signToken({
    ...sessionInfo,
    userId: user._id,
  });

  // return user & tokens
  return { user: user.omitPassword(), accessToken, refreshToken };
};
