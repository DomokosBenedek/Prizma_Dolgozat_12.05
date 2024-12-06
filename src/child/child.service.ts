import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    try{
      return await this.db.child.findUniqueOrThrow({where:{id}});
    }catch(error){
      throw new NotFoundException("Child not found");
    }
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    try{
      return await this.db.child.update({where:{id},data:updateChildDto});  
    }catch(error){
      throw new NotFoundException("Child not found");
    };
  }

  remove(id: number) {
    try{
      return this.db.child.delete({where:{id}});
    }catch(error){
      throw new NotFoundException("Child not found");
    }
  }

  async addToyToChild(childid: number, toyid: number) {
    const child = await this.db.child.findUniqueOrThrow({ where: { id: childid } });
    const toy = await this.db.toy.findUniqueOrThrow({ where: { id: toyid } });
    if (!child || !toy) {
      throw new NotFoundException('Child or Toy not found');
    }else{
      await this.db.toy.update({
        where: { id: toyid },
        data: { children: { connect: { id: childid } } },
      });
    }
  }

  async removeToyFromChild(childid: number, toyid: number) {
    const child = await this.db.child.findUniqueOrThrow({ where: { id: childid } });
    const toy = await this.db.toy.findUniqueOrThrow({ where: { id: toyid } });
    if (!child || !toy) {
      throw new NotFoundException('Child or Toy not found');
    }
    else{
      await this.db.toy.update({
        where: { id: toyid },
        data: { children: { disconnect: { id: childid } } },
      });
    }
  }
}
