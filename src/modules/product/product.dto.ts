import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsString()
  oldPrice: string;

  @IsString()
  newPrice: string;

  @IsNumber()
  @IsOptional()
  sold: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsArray()
  details: unknown;
}

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsString()
  oldPrice: string;

  @IsString()
  newPrice: string;

  @IsNumber()
  @IsOptional()
  sold: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsArray()
  details: unknown;
}

export class GetListProductDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  q?: string;

  @IsNumberString()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  price?: string;
}
