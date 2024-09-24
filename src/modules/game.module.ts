import { Module } from '@nestjs/common';
import { GameController } from '../controllers/game.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GameController],
  providers: [],
})
export class GameModule {}
