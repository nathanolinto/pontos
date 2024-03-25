import { DeletePointUseCase } from "@/core/src/application/use-case/delete-point.useCase";
import { PointRepository } from "@/core/src/infra/mongoose/repositories/point.repository";
import { NextRequest } from "next/server";
import { CreatePointUseCase } from "../../../core/src/application/use-case/create-point.useCase";
import connectMongo from "../../../core/src/infra/mongoose/db.mongoose";
import { UserRepository } from "../../../core/src/infra/mongoose/repositories/user.repository";
import { HandleErrors } from "../errors/handleError";
import { AuthGuard } from "../guards/access-token.guard";
import { PointDto, PointDtoValidatorFactory } from "./dto/point.dto";

export async function POST(req: NextRequest) {
  const body: PointDto = await req.json();
  try {
    PointDtoValidatorFactory.create(body);
    const user = AuthGuard.execute();
    await connectMongo();
    const userRepository = new UserRepository();
    const pointRepository = new PointRepository();
    const createPointUseCase = new CreatePointUseCase(
      userRepository,
      pointRepository
    );
    const point = await createPointUseCase.execute({
      ...body,
      userId: user.id,
    });
    return Response.json(point);
  } catch (e) {
    return HandleErrors.execute(e);
  }
}

export async function DELETE(req: NextRequest) {
  const body: PointDto = await req.json();
  try {
    PointDtoValidatorFactory.create(body);
    const user = AuthGuard.execute();
    await connectMongo();
    const userRepository = new UserRepository();
    const pointRepository = new PointRepository();
    const deletePointUseCase = new DeletePointUseCase(
      userRepository,
      pointRepository
    );
    await deletePointUseCase.execute({
      ...body,
      userId: user.id,
    });
    return Response.json({});
  } catch (e) {
    return HandleErrors.execute(e);
  }
}
