import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;

  lin2?: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
