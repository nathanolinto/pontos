import { NextRequest } from "next/server";
import { GetSettingsUseCase } from "../../../core/src/application/use-case/get-settings.useCase";
import { UpdateSettingsUseCase } from "../../../core/src/application/use-case/update-settings.useCase";
import connectMongo from "../../../core/src/infra/mongoose/db.mongoose";
import { UserRepository } from "../../../core/src/infra/mongoose/repositories/user.repository";
import { HandleErrors } from "../errors/handleError";
import { AuthGuard } from "../guards/access-token.guard";
import { SettingsDto, SettingsDtoValidatorFactory } from "./dto/settings.dto";

export async function GET() {
  try {
    const user = AuthGuard.execute();
    await connectMongo();
    const userRepository = new UserRepository();
    const getSettingsUseCase = new GetSettingsUseCase(userRepository);
    const settings = await getSettingsUseCase.execute(user.id);
    return Response.json(settings);
  } catch (e) {
    return HandleErrors.execute(e);
  }
}

export async function PUT(req: NextRequest) {
  const body: SettingsDto = await req.json();
  try {
    SettingsDtoValidatorFactory.create(body);
    const user = AuthGuard.execute();
    await connectMongo();
    const userRepository = new UserRepository();
    const updateSettingsUseCase = new UpdateSettingsUseCase(userRepository);
    const settings = await updateSettingsUseCase.execute({
      userId: user.id,
      settings: body,
    });
    return Response.json(settings);
  } catch (e) {
    return HandleErrors.execute(e);
  }
}
