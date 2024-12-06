import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToyService {
  db:PrismaService;
  constructor(db:PrismaService){
    this.db=db;
  }
  
  create(createToyDto: CreateToyDto) {
    return this.db.toy.create({data:createToyDto});;
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    try{
      return await this.db.toy.findUniqueOrThrow({where:{id}});  
    }catch(error){
      throw new NotFoundException("Toy not found");
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try{
      return await this.db.toy.update({where:{id},data:updateToyDto});
    }catch(error){
      throw new NotFoundException("Toy not found");
    }  
  }

  remove(id: number) {
    try{
      return this.db.toy.delete({where:{id}});  
    }catch(error){
      throw new NotFoundException("Toy not found");
    }
  }

  async addChildToToy(toyid: number, childid: number) {
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

  async removeChildFromToy(toyid: number, childid: number) {
    const child = await this.db.child.findUniqueOrThrow({ where: { id: childid } });
    const toy = await this.db.toy.findUniqueOrThrow({ where: { id: toyid } });
    if (!child || !toy) {
      throw new NotFoundException('Child or Toy not found');
    }else{
      await this.db.toy.update({
        where: { id: toyid },
        data: { children: { disconnect: { id: childid } } },
      });
    }
  }
}
