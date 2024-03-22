import { ObjectId } from "mongodb";
import { Document, FilterQuery, Model, SortOrder } from "mongoose";
import { Entity, Id } from "../../../seedwork/entity/entity";
import { Mapper } from "../mapper/mapper";

type Options<T> = {
  filter?: FilterQuery<T>;
  sort?: string | { [key: string]: SortOrder };
  limit?: number;
};

export class CommonRepository<
  T extends Document,
  M extends Mapper,
  E extends Entity
> {
  constructor(private readonly model: Model<T>, private readonly mapper: M) {}

  private filterWithdeletedAt(filter: FilterQuery<T>) {
    return { ...filter, deleted_at: { $exists: false } };
  }

  private makeQuery(operation: string, options?: Options<T>) {
    if (!options) {
      options = {
        filter: {},
      };
    }
    let query = this.model[operation](this.filterWithdeletedAt(options.filter));
    if (options.sort) {
      query = query.sort(options.sort);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }
    return query;
  }

  async findBy(options?: Options<T>): Promise<E[]> {
    const items = await this.makeQuery("find", options).exec();
    return items.map((item) => this.mapper.toDomain(item));
  }

  async findOneBy(options?: Options<T>): Promise<E | null> {
    const item = await this.makeQuery("findOne", options).exec();
    return this.mapper.toDomain(item);
  }

  async softDelete(id: Id): Promise<void> {
    await this.model
      .findByIdAndUpdate(new ObjectId(id), { deleted_at: new Date() })
      .exec();
  }

  async save(entity: E): Promise<void> {
    const entityToMongoose = this.mapper.toMongoose(entity);
    await this.model.updateOne(
      { _id: entityToMongoose._id },
      entityToMongoose,
      {
        upsert: true,
      }
    );
  }

  async saveMany(entities: E[]): Promise<void> {
    const bulkOps = entities.map((entity) => {
      const entityToMongoose = this.mapper.toMongoose(entity);
      return {
        updateOne: {
          filter: { _id: entityToMongoose._id },
          update: { $set: entityToMongoose },
          upsert: true,
        },
      };
    });
    await this.model.bulkWrite(bulkOps);
  }
}
