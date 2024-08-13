import { Injectable } from '@nestjs/common';
import { TResult } from 'src/common/types';
import { CategoryEntity } from 'src/entities/category.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ChartsService {
  constructor(private readonly dataSource: DataSource) {}

  async chartsCount() {
    const [user, product, order, category, comment] = await Promise.all([
      await this.dataSource.getRepository(UserEntity).count(),
      await this.dataSource.getRepository(ProductEntity).count(),
      await this.dataSource.getRepository(OrderEntity).count(),
      await this.dataSource.getRepository(CategoryEntity).count(),
      await this.dataSource.getRepository(CommentEntity).count(),
    ]);

    const data = [
      {
        name: 'User',
        value: user,
      },
      {
        name: 'Product',
        value: product,
      },
      {
        name: 'Order',
        value: order,
      },
      {
        name: 'Category',
        value: category,
      },
      {
        name: 'Comment',
        value: comment,
      },
    ];

    return {
      statusCode: 200,
      message: 'Thống kế số lượng thành công',
      data,
    } as TResult;
  }
}
