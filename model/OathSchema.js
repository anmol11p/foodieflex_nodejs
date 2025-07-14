import { Schema, model } from "mongoose";

const OathSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "github"],
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OauthModel = model("OAuthAccount", OathSchema);
export default OauthModel;
