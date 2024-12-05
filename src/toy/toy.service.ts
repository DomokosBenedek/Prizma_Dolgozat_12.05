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

  findOne(id: number) {
    return this.db.toy.findUnique({where:{id}});
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
}
