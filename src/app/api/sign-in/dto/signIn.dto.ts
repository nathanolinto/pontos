import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { EntityValidationError } from "../../../../core/src/seedwork/errors/validation.error";
import { ClassValidatorFields } from "../../../../core/src/seedwork/validators/class-validator-fields";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor({ email, password }: SignInDto) {
    Object.assign(this, {
      email,
      password,
    });
  }
}

export class SignInDtoValidator extends ClassValidatorFields<SignInDto> {
  validate(data: SignInDto): boolean {
    return super.validate(new SignInDto(data ?? ({} as any)));
  }
}

export class SignInDtoValidatorFactory {
  static create(data: SignInDto) {
    const validator = new SignInDtoValidator();
    const isValid = validator.validate(data);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
