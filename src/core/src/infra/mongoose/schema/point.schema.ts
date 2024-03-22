import { ObjectId } from "mongodb";
import { HydratedDocument, Schema, model, models } from "mongoose";
import { PointProps } from "../../../domain/point/entities/point";

export type PointDocument = HydratedDocument<PointProps>;

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

export const Point = models.Point || model("Point", PointSchema);
