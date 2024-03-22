import { ObjectId } from "mongodb";

export abstract class Entity<
  Props = any,
  JsonProps = Required<{ id: string } & Props>
> {
  private _id!: string;

  constructor(public readonly props: Props, id?: string) {
    this.id = id ?? new ObjectId().toString();
  }

  set id(value: string) {
    this._id = value;
  }
  get id() {
    return this._id;
  }

  abstract toJSON(): JsonProps;
}
