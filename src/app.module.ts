import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GyerekModule } from './gyerek/gyerek.module';
import { JatekModule } from './jatek/jatek.module';
import { ToyModule } from './toy/toy.module';
import { ChildModule } from './child/child.module';

@Module({
  imports: [GyerekModule, JatekModule, ToyModule, ChildModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
