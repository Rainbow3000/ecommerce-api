import { isNumber, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ORDER_STATUS } from 'src/common/enums';

export class CreateOrderDto {
  @IsString()
  totalMoney: string;

  @IsString()
  @IsOptional()
  userNote: string;
}

export class UpdateOrderDto {
  @IsString()
  orderStatus: ORDER_STATUS;
}

export class GetListOrderDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  q?: string;
}
