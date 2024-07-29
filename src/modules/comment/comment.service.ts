import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { DataSource, Repository } from 'typeorm';
import {
  CreateCommentDto,
  GetListCommentDto,
  UpdateCommentDto,
} from './comment.dto';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants';
import {
  COMMENT_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  USER_NOT_FOUND,
} from 'src/common/error';
import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async list(payload: GetListCommentDto) {
    const limit = payload.limit || DEFAULT_LIMIT;
    const page = payload.page || DEFAULT_PAGE;

    return await this.commentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        product: true,
        user: true,
      },
    });
  }

  async create(payload: CreateCommentDto) {
    const user = await this.dataSource
      .getRepository(CommentEntity)
      .findOneBy({ id: payload.userId });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const product = await this.dataSource
      .getRepository(ProductEntity)
      .findOneBy({ id: payload.productId });

    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);

    await this.commentRepository.insert(payload);

    return { message: 'success' };
  }

  async update(id: number, payload: UpdateCommentDto) {
    const user = await this.dataSource
      .getRepository(CommentEntity)
      .findOneBy({ id: payload.userId });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const product = await this.dataSource
      .getRepository(ProductEntity)
      .findOneBy({ id: payload.productId });

    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);

    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND);

    await this.commentRepository.update(id, payload);

    return { message: ' success' };
  }

  async delete(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND);

    await this.commentRepository.softDelete(id);

    return { message: 'success' };
  }
}
