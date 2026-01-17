import { IsEnum, IsString, Validate } from 'class-validator';
import { IdentifierValidator } from 'src/shared/validators/identifier.validator';

export class SendOtpRequest {
  @IsString()
  @Validate(IdentifierValidator)
  identifier: string;

  @IsEnum(['phone', 'email'])
  type: 'phone' | 'email';
}
