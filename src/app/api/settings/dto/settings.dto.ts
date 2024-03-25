import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
import "reflect-metadata";
import { EntityValidationError } from "../../../../core/src/seedwork/errors/validation.error";
import { ClassValidatorFields } from "../../../../core/src/seedwork/validators/class-validator-fields";

class VariationDto {
  @ArrayNotEmpty()
  @ArrayMinSize(20)
  @ArrayMaxSize(20)
  adjustment: boolean[];

  @ArrayNotEmpty()
  @ArrayMinSize(20)
  @ArrayMaxSize(20)
  closing: boolean[];
}

export class SettingsDto {
  @IsBoolean()
  @IsNotEmpty()
  admin_points: boolean;

  @IsNumber()
  @IsNotEmpty()
  opening: number;

  @IsNumber()
  @IsNotEmpty()
  biggest: number;

  @IsNumber()
  @IsNotEmpty()
  lowest: number;

  @IsNumber()
  @IsNotEmpty()
  closing: number;

  @IsNumber()
  @IsNotEmpty()
  adjustment: number;

  @ValidateNested()
  variation: VariationDto;

  constructor({
    admin_points,
    opening,
    biggest,
    lowest,
    closing,
    adjustment,
    variation,
  }: SettingsDto) {
    Object.assign(this, {
      admin_points,
      opening,
      biggest,
      lowest,
      closing,
      adjustment,
      variation,
    });
  }
}

export class SettingsDtoValidator extends ClassValidatorFields<SettingsDto> {
  validate(data: SettingsDto): boolean {
    return super.validate(new SettingsDto(data ?? ({} as any)));
  }
}

export class SettingsDtoValidatorFactory {
  static create(data: SettingsDto) {
    const validator = new SettingsDtoValidator();
    const isValid = validator.validate(data);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
