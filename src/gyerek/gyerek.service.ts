import { Injectable } from '@nestjs/common';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GyerekService {
  constructor(private db: PrismaService=db) {}

  create(createGyerekDto: CreateGyerekDto) {
    return this.db.gyerek.create({data:createGyerekDto});
  }

  findAll() {
    return this.db.gyerek.findMany();
  }

  findOne(id: number) {
    return this.db.gyerek.findUnique({where:{Id:id}});
  }

  update(id: number, updateGyerekDto: UpdateGyerekDto) {
    return this.db.gyerek.update({where:{Id:id}, data:updateGyerekDto});
  }

  remove(id: number) {
    return this.db.gyerek.delete({where:{Id:id}});
  }
}
