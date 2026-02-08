import AppErrorCode from "../constants/AppErrorCode";
import AppError from "./appError";
import { HttpStatusCode } from "../constants/http";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is false
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => {
  if (!condition) {
    throw new AppError(httpStatusCode, message, appErrorCode);
  }
};

export default appAssert;
