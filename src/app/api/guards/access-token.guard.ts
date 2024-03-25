import { headers } from "next/headers";
import { Token } from "../../../core/src/domain/token/token";
import { UnauthorizedError } from "../../../core/src/seedwork/errors/unauthorized.error";

export class AuthGuard {
  static execute() {
    const token = AuthGuard.extractTokenFromHeader(
      headers().get("authorization")
    );
    if (!token) {
      throw new UnauthorizedError("");
    }
    try {
      const auth = new Token();
      const payload = auth.verify(token);
      return { id: payload["id"] };
    } catch {
      throw new UnauthorizedError("");
    }
  }

  static extractTokenFromHeader(value?: string) {
    const [type, token] = value?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
