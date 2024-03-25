import { IsNotEmpty, IsNumber } from "class-validator";
import { EntityValidationError } from "../../../../core/src/seedwork/errors/validation.error";
import { ClassValidatorFields } from "../../../../core/src/seedwork/validators/class-validator-fields";

export class PointDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor({ price }: PointDto) {
    Object.assign(this, {
      price,
    });
  }
}

export class PointDtoValidator extends ClassValidatorFields<PointDto> {
  validate(data: PointDto): boolean {
    return super.validate(new PointDto(data ?? ({} as any)));
  }
}

export class PointDtoValidatorFactory {
  static create(data: PointDto) {
    const validator = new PointDtoValidator();
    const isValid = validator.validate(data);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
