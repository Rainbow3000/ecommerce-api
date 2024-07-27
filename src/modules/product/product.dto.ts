import { IsNumber, IsOptional, IsString, registerDecorator, ValidateIf, ValidationArguments, ValidationOptions } from "class-validator"

export class CreateProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  @ValidateIf(o => !o.video)
  image: string

  @IsString()
  @ValidateIf(o => !o.image)
  video: string
  
  @IsString()
  color: string

  @IsString()
  oldPrice: string

  @IsString()
  newPrice: string

  @IsNumber()
  @IsOptional()
  sold: number

  @IsNumber()
  @IsOptional()
  stock: number

  @IsNumber()
  categoryId: number
}

export class UpdateProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  @ValidateIf(o => !o.video)
  image: string

  @IsString()
  @ValidateIf(o => !o.image)
  video: string
  
  @IsString()
  color: string

  @IsString()
  oldPrice: string

  @IsString()
  newPrice: string

  @IsNumber()
  @IsOptional()
  sold: number

  @IsNumber()
  @IsOptional()
  stock: number

  @IsNumber()
  categoryId: number
}

export class GetListProductDto {
  @IsOptional()
  @IsNumber()
  page: number

  @IsNumber()
  @IsOptional()
  limit: number

  @IsString()
  @IsOptional()
  q?: string
}