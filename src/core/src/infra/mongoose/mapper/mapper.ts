export abstract class Mapper<
  Document = any,
  Entity = any,
  DocumentProps = any
> {
  abstract toDomain(document: Document): Entity;
  abstract toMongoose(entity: Entity): DocumentProps;
}
