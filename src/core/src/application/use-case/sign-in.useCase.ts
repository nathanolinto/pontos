import { Token } from "../../domain/token/token";
import { UserRepository } from "../../infra/mongoose/repositories/user.repository";
import { NotFoundError } from "../../seedwork/errors/not-found.error";
import { UseCase } from "../../seedwork/use-case/default-use-case";

export type Input = { email: string; password: string };
export type Outoput = {
  access_token: string;
  refresh_token: string;
};

export class SignInUseCase implements UseCase<Input, Outoput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Outoput> {
    const { email, password } = input;

    const user = await this.userRepository.findOneBy({
      filter: { email },
    });

    if (!user || !user.comparePassword(password)) {
      throw new NotFoundError(`User ${email} not Found.`);
    }

    const token = new Token();
    const tokens = token.getTokens({
      id: user.id,
      is_admin: user.is_admin,
    });
    user.updateRefreshToken(tokens.refresh_token);
    await this.userRepository.save(user);

    return tokens;
  }
}
