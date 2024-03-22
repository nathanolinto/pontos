import { User } from "../../../domain/user/user";
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
}
