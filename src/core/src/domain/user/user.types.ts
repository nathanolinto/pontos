export type UserProps = {
  email: string;
  password: string;
  settings?: SettingsProps;
  is_admin?: boolean;
  refresh_token?: string;
};

export type SettingsProps = {
  admin_points: boolean;
  opening: number;
  biggest: number;
  lowest: number;
  closing: number;
  adjustment: number;
  variation: VariationSettingsProps;
};

export type VariationSettingsProps = {
  adjustment: boolean[];
  closing: boolean[];
};

export type UserPropsJson = Required<{ id: string } & UserProps>;
