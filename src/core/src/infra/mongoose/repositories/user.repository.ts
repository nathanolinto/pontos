import { ObjectId } from "mongodb";
import { User } from "../../../domain/user/user";
import { NotFoundError } from "../../../seedwork/errors/not-found.error";
import { UserMapper } from "../mapper/user-mapper";
import { UserDocument, User as UserMongoose } from "../schema/user.schema";
import { CommonRepository } from "./common-repository";

export class UserRepository extends CommonRepository<
  UserDocument,
  UserMapper,
  User
> {
  constructor() {
    super(UserMongoose, new UserMapper());
  }

  async findById(id: string) {
    const user = await this.findOneBy({ filter: { _id: new ObjectId(id) } });
    if (!user) {
      throw new NotFoundError(`User ${id} not Found.`);
    }
    return user;
  }
}
