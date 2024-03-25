import { Point } from "../../../domain/point/point";
import { PointMapper } from "../mapper/point-mapper";
import { PointDocument, Point as PointMongoose } from "../schema/point.schema";
import { CommonRepository } from "./common-repository";

export class PointRepository extends CommonRepository<
  PointDocument,
  PointMapper,
  Point
> {
  constructor() {
    super(PointMongoose, new PointMapper());
  }
}
