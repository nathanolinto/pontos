import { ObjectId } from "mongodb";
import { HydratedDocument, Schema, model, models } from "mongoose";
import { PointProps } from "../../../domain/point/point";
import { deletedAtPlugin } from "./deletedAt.plugin";

export type PointDocument = HydratedDocument<
  { user_id: ObjectId } & Omit<PointProps, "user_id">
>;

export const PointSchema = new Schema<PointProps>(
  {
    user_id: ObjectId,
    price: Number,
    is_admin: Boolean,
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

PointSchema.plugin(deletedAtPlugin);

export const Point = models.Point || model("Point", PointSchema);
