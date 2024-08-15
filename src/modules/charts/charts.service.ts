import { Injectable } from '@nestjs/common';
import { ORDER_STATUS } from 'src/common/enums';
import { TResult } from 'src/common/types';
import { CategoryEntity } from 'src/entities/category.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderDetailsEntity } from 'src/entities/order_details.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ChartsService {
  constructor(private readonly dataSource: DataSource) { }

  async chartsCount() {
    const [user, product, order, category, comment] = await Promise.all([
      await this.dataSource.getRepository(UserEntity).count(),
      await this.dataSource.getRepository(ProductEntity).count(),
      await this.dataSource.getRepository(OrderEntity).count(),
      await this.dataSource.getRepository(CategoryEntity).count(),
      await this.dataSource.getRepository(CommentEntity).count(),
    ]);

    const data = {
      labels: ['Người dùng', 'Sản phẩm', 'Đơn hàng', 'Danh mục', 'Bình luận'],
      // series: [user, product, order, category, comment],
      series: [5, 10, 15, 20, 25],
    };

    return {
      statusCode: 200,
      message: 'Thống kế số lượng thành công',
      data,
    } as TResult;
  }

  async userStat() {
    const user = await this.dataSource.getRepository(UserEntity).find();

    if (!user) return;

    const counts = {};
    const data = {
      labels: [],
      series: [],
    };

    user.forEach(function (item) {
      const month = item.createdAt.getMonth() + 1;

      counts[month] = (counts[month] || 0) + 1;
    });

    Object.keys(counts).forEach((item) => {
      data.labels.push(`Tháng ${item}`);
      data.series.push(counts[item]);
    });

    return {
      statusCode: 200,
      message: 'Thống kế số người dùng đăng ký',
      data,
    } as TResult;
  }

  async orderStat() {
    const user = await this.dataSource.getRepository(OrderEntity).find();

    if (!user) return;

    const counts = {};
    const data = {
      labels: [],
      series: [],
    };

    user.forEach(function (item) {
      const month = item.createdAt.getMonth() + 1;

      counts[month] = (counts[month] || 0) + 1;
    });

    Object.keys(counts).forEach((item) => {
      data.labels.push(`T${item}`);
      data.series.push(counts[item]);
    });

    return {
      statusCode: 200,
      message: 'Thống kê đơn hàng',
      data,
    } as TResult;
  }

  async getProductSellest() {
    const product = await this.dataSource.getRepository(ProductEntity).find({
      order: {
        sold: 'DESC'
      },
      take: 1
    })

    return {
      statusCode: 200,
      message: 'Thống kê đơn hàng',
      data: product[0],
    } as TResult;
  }

  async getRevenueMonthly() {
    const order = await this.dataSource.getRepository(OrderEntity).find({
      where: {
        orderStatus: ORDER_STATUS.SUCCESS
      }
    });

    if (!order.length) return

    const data = {
      labels: [],
      series: [],
    };

    const revenue = order.reduce((initValue, currentValue) => {
      const month = currentValue.createdAt.getMonth() + 1

      const checkExisted = initValue[month]

      if (checkExisted) {
        const total = initValue[month] + parseFloat(currentValue.totalMoney)
        initValue[month] = total

        return initValue
      }

      initValue[month] = parseFloat(currentValue.totalMoney)

      return initValue
    }, {})

    Object.keys(revenue).forEach((item) => {
      data.labels.push(`T${item}`);
      data.series.push(revenue[item]);
    });

    return {
      statusCode: 200,
      message: 'Thống kê doanh thu mỗi tháng',
      data,
    } as TResult;
  }
}
