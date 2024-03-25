import { ObjectId } from "mongodb";
import { Point, PointProps } from "../../../domain/point/point";
import { PointDocument } from "../schema/point.schema";
import { Mapper } from "./mapper";

export class PointMapper extends Mapper<
  PointDocument,
  Point,
  Required<{ _id: ObjectId; user_id: ObjectId } & Omit<PointProps, "user_id">>
> {
  toDomain(entity: PointDocument): Point {
    return new Point(
      {
        price: entity.price,
        user_id: entity.user_id.toString(),
        is_admin: entity.is_admin,
      },
      entity._id.toString()
    );
  }

  toMongoose(
    point: Point
  ): Required<
    { _id: ObjectId; user_id: ObjectId } & Omit<PointProps, "user_id">
  > {
    const toJson = point.toJSON();
    return {
      _id: new ObjectId(toJson.id),
      price: toJson.price,
      user_id: new ObjectId(toJson.user_id),
      is_admin: toJson.is_admin,
    };
  }
}
