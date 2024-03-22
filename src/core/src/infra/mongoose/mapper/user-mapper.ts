import { ObjectId } from "mongodb";
import { User } from "../../../domain/user/user";
import { UserProps } from "../../../domain/user/user.types";
import { UserDocument } from "../schema/user.schema";
import { Mapper } from "./mapper";

export class UserMapper extends Mapper<
  UserDocument,
  User,
  Required<{ _id: ObjectId } & UserProps>
> {
  toDomain(entity: UserDocument): User {
    return new User(
      {
        email: entity.email,
        password: entity.password,
        settings: entity.settings,
        is_admin: entity.is_admin,
        refresh_token: entity.refresh_token,
      },
      entity._id.toString()
    );
  }

  toMongoose(user: User): Required<{ _id: ObjectId } & UserProps> {
    const userJson = user.toJSON();
    return {
      _id: new ObjectId(userJson.id),
      email: userJson.email,
      password: userJson.password,
      settings: userJson.settings,
      is_admin: userJson.is_admin,
      refresh_token: userJson.refresh_token,
    };
  }
}
