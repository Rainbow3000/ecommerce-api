import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { ROLE } from './common/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });
  await app.listen(5000);
  const a = 10;

  const dataSource = await app.get(DataSource);

  await initRole(dataSource)


}

async function initRole(dataSource: DataSource) {
  const roleLength = await dataSource.getRepository(RoleEntity).count()

  if (!roleLength) {
    await dataSource.getRepository(RoleEntity).save([
      {
        roleName: ROLE.SUPER_ADMIN,
      },
      {
        roleName: ROLE.ADMIN,
      },
      {
        roleName: ROLE.USER,
      }
    ])
  }
}

bootstrap();
