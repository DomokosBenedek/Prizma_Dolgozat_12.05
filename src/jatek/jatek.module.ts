import { Module } from '@nestjs/common';
import { JatekService } from './jatek.service';
import { JatekController } from './jatek.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JatekController, PrismaService],
  providers: [JatekService,PrismaService],
})
export class JatekModule {}
