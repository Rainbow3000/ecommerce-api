import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/constants';
import { ORDER_NOT_FOUND } from 'src/common/error';
import { CreateOrderDto, GetListOrderDto, UpdateOrderDto } from './Order.dto';
import { OrderEntity } from 'src/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async list(payload: GetListOrderDto) {
    const limit = payload.limit || DEFAULT_LIMIT;
    const page = payload.page || DEFAULT_PAGE;

    return await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        user: true,
      },
      select: {
        user: {
          email: true,
        },
      },
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
    await this.orderRepository.insert({ ...payload, userId });

    return {
      statusCode: 201,
      message: 'Tạo đơn hàng thành công',
    };
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
    const Order = await this.orderRepository.findOneBy({ id });

    if (!Order) throw new BadRequestException(ORDER_NOT_FOUND);

    await this.orderRepository.softDelete(id);

    return {
      statusCode: 200,
      message: 'Xóa đon hàng thành công',
    };
  }
}
