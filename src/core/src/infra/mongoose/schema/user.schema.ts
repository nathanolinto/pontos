import { HydratedDocument, Schema, model, models } from "mongoose";
import {
  SettingsProps,
  UserProps,
  VariationSettingsProps,
} from "../../../domain/user/entities/user";

export type UserDocument = HydratedDocument<UserProps>;

export const VariationSchema = new Schema<VariationSettingsProps>({
  adjustment: { type: [Boolean], default: [] },
  closing: { type: [Boolean], default: [] },
});

export const SettingsSchema = new Schema<SettingsProps>({
  admin_points: { type: Boolean, default: true },
  opening: { type: Number, min: 1 },
  biggest: { type: Number, min: 1 },
  lowest: { type: Number, min: 1 },
  closing: { type: Number, min: 1 },
  adjustment: { type: Number, min: 1 },
  variation: VariationSchema,
});

export const UserSchema = new Schema<UserProps>(
  {
    email: String,
    password: String,
    settings: { type: SettingsSchema, default: {} },
    is_admin: Boolean,
    refresh_token: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

export const User = models.User || model("User", UserSchema);
