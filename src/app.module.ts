import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProcessModule } from './process/process.module';
import { StepModule } from './step/step.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: '5432',
      username: 'postgres',
      password: 'postgres',
      database: 'tcc',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProcessModule,
    StepModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
