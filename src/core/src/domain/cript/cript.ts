import * as bcrypt from "bcrypt";

export class Cript {
  static hash(value: string, salt = 10): string {
    return bcrypt.hashSync(value, salt);
  }

  static compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
