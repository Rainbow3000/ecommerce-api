import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants';
import {
  CATEGORY_NOT_FOUND,
  PRODUCT_DUPLICATE_NAME,
  PRODUCT_NOT_FOUND,
} from 'src/common/error';
import { ProductEntity } from 'src/entities/product.entity';
import {
  CreateProductDto,
  GetListProductDto,
  UpdateProductDto,
} from './product.dto';
import { CategoryEntity } from 'src/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async list({ limit, page, q }: GetListProductDto) {
    const where: FindOptionsWhere<ProductEntity> = {};

    if (q) {
      where.name = Like(`%${q}%`);
    }

    return await this.productRepository.find({
      skip: page || DEFAULT_PAGE * limit || DEFAULT_LIMIT,
      take: limit || DEFAULT_LIMIT,
      where,
    });
  }

  async single(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);

    return product;
  }

  async create(payload: CreateProductDto) {
    const category = await this.dataSource
      .getRepository(CategoryEntity)
      .findOneBy({ id: payload.categoryId });

    if (!category) {
      throw new BadRequestException(CATEGORY_NOT_FOUND);
    }

    const checkNameExsited = await this.productRepository.findOneBy({
      name: payload.name,
    });

    if (checkNameExsited) throw new BadRequestException(PRODUCT_DUPLICATE_NAME);

    await this.productRepository.insert(payload);

    return {
      statusCode: 201,
      message: 'Tạo sản phẩm thành công',
    };
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new BadRequestException(PRODUCT_NOT_FOUND);

    const category = await this.dataSource
      .getRepository(CategoryEntity)
      .findOneBy({ id: payload.categoryId });

    if (!category) throw new BadRequestException(CATEGORY_NOT_FOUND);

    await this.productRepository.update(id, payload);

    return {
      statusCode: 200,
      message: 'Cập nhật sản phẩm thành công',
    };
  }

  async delete(id: number) {
    const category = await this.productRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(CATEGORY_NOT_FOUND);
    }

    await this.productRepository.softDelete(id);

    return {
      statusCode: 200,
      message: 'Xóa sản phẩm thành công',
    };
  }
}
