import { Entity } from "../../seedwork/entity/entity";
import { Cript } from "../cript/cript";
import { defaultSettings } from "./constants";
import { SettingsProps, UserProps, UserPropsJson } from "./user.types";

export class User extends Entity<UserProps, UserPropsJson> {
  constructor(public readonly props: UserProps, id?: string) {
    super(props, id);

    this.props.password = id ? props.password : this.hash(props.password);
    this.props.settings = props.settings || defaultSettings;
    this.props.is_admin = props.is_admin || false;
    this.props.refresh_token = props.refresh_token ?? null;
  }

  get is_admin() {
    return this.props.is_admin;
  }

  get settings() {
    return this.props.settings;
  }

  private hash(value: string) {
    return Cript.hash(value);
  }

  comparePassword(value: string): boolean {
    return Cript.compare(value, this.props.password);
  }

  updateRefreshToken(value: string) {
    this.props.refresh_token = value ? this.hash(value) : null;
  }

  updateSettings(props: SettingsProps) {
    this.props.settings = props;
  }

  updatePassword(value: string) {
    this.props.password = this.hash(value);
  }

  toJSON(): UserPropsJson {
    return {
      id: this.id,
      email: this.props.email,
      password: this.props.password,
      settings: this.props.settings,
      is_admin: this.props.is_admin,
      refresh_token: this.props.refresh_token,
    };
  }
}
