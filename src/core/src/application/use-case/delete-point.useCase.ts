import { ObjectId } from "mongodb";
import { PointRepository } from "../../infra/mongoose/repositories/point.repository";
import { UserRepository } from "../../infra/mongoose/repositories/user.repository";
import { UseCase } from "../../seedwork/use-case/default-use-case";

export type Input = { userId: string; price: number };
export type Outoput = void;

export class DeletePointUseCase implements UseCase<Input, Outoput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pointRepository: PointRepository
  ) {}

  async execute(input: Input): Promise<Outoput> {
    const { userId, price } = input;
    await this.userRepository.findById(userId);
    const point = await this.pointRepository.findOneBy({
      filter: {
        user_id: new ObjectId(userId),
        price,
      },
    });
    if (point) {
      await this.pointRepository.softDelete(point.id);
    }
  }
}
