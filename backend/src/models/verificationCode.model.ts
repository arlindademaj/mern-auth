import mongoose from "mongoose";
import verificationCodeType from "../constants/verificationCodeType";

export interface verificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: verificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const verifactionCodeSchema = new mongoose.Schema<verificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const verificationCodeModel = mongoose.model<verificationCodeDocument>(
  "VerificationCode",
  verifactionCodeSchema,
  "verification_codes",
);
export default verificationCodeModel;
