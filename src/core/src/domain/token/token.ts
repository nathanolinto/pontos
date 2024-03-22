import * as jwt from "jsonwebtoken";
import { jwtConstants } from "./constants";

export class Token {
  private props = {
    secret: jwtConstants.secret,
    expiresToken: 60 * 60,
    expiresRefreshToken: 60 * 60 * 24 * 7,
  };

  getTokens(payload: object) {
    const access_token = jwt.sign(payload, this.props.secret, {
      expiresIn: this.props.expiresToken,
    });
    const refresh_token = jwt.sign(payload, this.props.secret, {
      expiresIn: this.props.expiresToken,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  verify(token: string) {
    try {
      return jwt.verify(token, this.props.secret);
    } catch (error) {
      console.error(error.message);
    }
  }
}
