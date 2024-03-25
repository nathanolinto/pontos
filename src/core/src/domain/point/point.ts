import { Entity } from "../../seedwork/entity/entity";
import { roundValue } from "../../seedwork/utils";

export type PointProps = {
  user_id: string;
  price: number;
  is_admin?: boolean;
};

export type PointPropsJson = Required<{ id: string } & PointProps>;

export class Point extends Entity<PointProps, PointPropsJson> {
  constructor(public readonly props: PointProps, id?: string) {
    super(props, id);

    this.props.price = roundValue(props.price);
    this.props.user_id = props.user_id;
    this.props.is_admin = props.is_admin || false;
  }

  rollover(value: number) {
    this.props.price += roundValue(value);
  }

  toJSON(): PointPropsJson {
    return {
      id: this.id,
      user_id: this.props.user_id,
      price: this.props.price,
      is_admin: this.props.is_admin,
    };
  }
}
