import { IsNumber, IsOptional, IsString } from "class-validator"

export class GetUserListDto {
  @IsString()
  @IsOptional()
  q?: string

  @IsNumber()
  limit: number

  @IsNumber()
  page: number
}