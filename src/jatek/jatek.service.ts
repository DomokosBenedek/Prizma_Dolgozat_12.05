import { Injectable } from '@nestjs/common';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JatekService {
  constructor(private db: PrismaService=db) {}
  
  create(createJatekDto: CreateJatekDto) {
    return this.db.jatek.create({data:createJatekDto});
  }

  findAll() {
    return this.db.jatek.findMany();
  }

  findOne(id: number) {
    return this.db.jatek.findUnique({where:{Id:id}});
  }

  update(id: number, updateJatekDto: UpdateJatekDto) {
    return this.db.jatek.update({where:{Id:id}, data:updateJatekDto});
  }

  remove(id: number) {
    return this.db.jatek.delete({where:{Id:id}});
  }
}
