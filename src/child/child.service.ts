import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildService {
  db:PrismaService;
  constructor(db:PrismaService){
    this.db=db;
  }

  create(createChildDto: CreateChildDto) {
    return this.db.child.create({data:createChildDto});;
  }

  findAll() {
    return this.db.child.findMany();
  }

  findOne(id: number) {
    return this.db.child.findUnique({where:{id}});
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    return await this.db.child.update({where:{id},data:updateChildDto});
  }

  remove(id: number) {
    return this.db.child.delete({where:{id}});
  }
}
