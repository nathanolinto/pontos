import { SettingsProps } from "../../domain/user/user.types";
import { UserRepository } from "../../infra/mongoose/repositories/user.repository";
import { UseCase } from "../../seedwork/use-case/default-use-case";

export type Input = { userId: string; settings: SettingsProps };
export type Outoput = SettingsProps;

export class UpdateSettingsUseCase implements UseCase<Input, Outoput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Outoput> {
    const { userId, settings } = input;
    const user = await this.userRepository.findById(userId);
    user.updateSettings(settings);
    await this.userRepository.save(user);
    return user.settings;
  }
}
