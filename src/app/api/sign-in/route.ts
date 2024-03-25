import { NextRequest } from "next/server";
import { SignInUseCase } from "../../../core/src/application/use-case/sign-in.useCase";
import connectMongo from "../../../core/src/infra/mongoose/db.mongoose";
import { UserRepository } from "../../../core/src/infra/mongoose/repositories/user.repository";
import { HandleErrors } from "../errors/handleError";
import { SignInDto, SignInDtoValidatorFactory } from "./dto/signIn.dto";

export async function POST(req: NextRequest) {
  const body: SignInDto = await req.json();
  try {
    SignInDtoValidatorFactory.create(body);
    await connectMongo();
    const userRepository = new UserRepository();
    const signInUseCase = new SignInUseCase(userRepository);
    const tokens = await signInUseCase.execute(body);
    return Response.json(tokens);
  } catch (e) {
    return HandleErrors.execute(e);
  }
}
