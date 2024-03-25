import { Point, PointPropsJson } from "../../domain/point/point";
import { PointRepository } from "../../infra/mongoose/repositories/point.repository";
import { UserRepository } from "../../infra/mongoose/repositories/user.repository";
import { UseCase } from "../../seedwork/use-case/default-use-case";

export type Input = { userId: string; price: number };
export type Outoput = PointPropsJson;

export class CreatePointUseCase implements UseCase<Input, Outoput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pointRepository: PointRepository
  ) {}

  async execute(input: Input): Promise<Outoput> {
    const { userId, price } = input;
    const user = await this.userRepository.findById(userId);
    const point = new Point({
      price,
      user_id: user.id,
      is_admin: user.is_admin,
    });
    await this.pointRepository.save(point);
    return point.toJSON();
  }
}
