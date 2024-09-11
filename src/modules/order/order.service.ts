import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants';
import { ORDER_NOT_FOUND } from 'src/common/error';
import { CreateOrderDto, GetListOrderDto, UpdateOrderDto } from './Order.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderDetailsEntity } from 'src/entities/order_details.entity';
import { MailService } from '../mail/mail.service';
import { TResult } from 'src/common/types';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly dataSource: DataSource,
    private readonly mailService: MailService,
  ) {}

  async list(payload: GetListOrderDto) {
    const limit = payload.limit || DEFAULT_LIMIT;
    const page = payload.page || DEFAULT_PAGE;

    return await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        user: true,
        orderDetails: true,
      },
      select: {
        user: {
          email: true,
        },
      },
    });
  }

  async listByUser(payload: GetListOrderDto, userId: number) {
    const limit = payload.limit || DEFAULT_LIMIT;
    const page = payload.page || DEFAULT_PAGE;

    return await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        user: true,
        orderDetails: true,
      },
      select: {
        user: {
          email: true,
        },
      },
      where:{
        userId
      }
    });
  }

  async single(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      select: {
        user: {
          email: true,
        },
      },
    });

    if (!order) throw new NotFoundException(ORDER_NOT_FOUND);

    return order;
  }

  async create(payload: CreateOrderDto, userId: number) {
    const order = await this.orderRepository.insert({ ...payload, userId });

    const token = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      await this.mailService.sendUserWelcome(
        'nguyenducthinh0401@gmail.com',
        token,
      );
    } catch (error) {
      console.log(error);
    }

    return {
      statusCode: 201,
      message: 'Tạo đơn hàng thành công',
      data: order.raw.insertId,
    } as TResult;
  }

  async update(id: number, { orderStatus }: UpdateOrderDto) {
    const Order = await this.orderRepository.findOneBy({ id });

    if (!Order) throw new BadRequestException(ORDER_NOT_FOUND);

    await this.orderRepository.update(id, { orderStatus });

    return {
      statusCode: 200,
      message: 'Cập nhật đơn hàng thành công',
    };
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) throw new BadRequestException(ORDER_NOT_FOUND);

    await this.orderRepository.softDelete(id);

    const orderDetailsIds = await this.dataSource
      .getRepository(OrderDetailsEntity)
      .find({
        where: {
          orderId: order.id,
        },
        select: ['id'],
      });

    if (orderDetailsIds.length) {
      await Promise.all(
        orderDetailsIds.map(async (item) => {
          await this.dataSource
            .getRepository(OrderDetailsEntity)
            .softDelete(item.id);
        }),
      );
    }

    return {
      statusCode: 200,
      message: 'Xóa đon hàng thành công',
    };
  }
}
