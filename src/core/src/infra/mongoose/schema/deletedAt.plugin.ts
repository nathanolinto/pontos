import { Schema } from "mongoose";

export const deletedAtPlugin = (schema: Schema): void => {
  schema.add({
    deleted_at: { type: Date, default: null },
  });
};
