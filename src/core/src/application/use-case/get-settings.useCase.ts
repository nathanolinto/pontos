import { SettingsProps } from "../../domain/user/user.types";
import { UserRepository } from "../../infra/mongoose/repositories/user.repository";
import { UseCase } from "../../seedwork/use-case/default-use-case";

export type Input = string;
export type Outoput = SettingsProps;

export class GetSettingsUseCase implements UseCase<Input, Outoput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Outoput> {
    const { settings } = await this.userRepository.findById(input);
    return settings;
  }
}
