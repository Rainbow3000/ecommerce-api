import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserListDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}

export class UpdateUserInfo {
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
