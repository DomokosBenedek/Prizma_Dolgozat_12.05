import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childService.update(+id, updateChildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childService.remove(+id);
  }

  @Put(':childId/toys/:toyId')
  addToyToChild(@Param('childId') childId: string, @Param('toyId') toyId: string) {
    return this.childService.addToyToChild(+childId, +toyId);
  }
  
  @Delete(':childId/toys/:toyId')
  removeToyFromChild(@Param('childId') childId: string, @Param('toyId') toyId: string) {
    return this.childService.removeToyFromChild(+childId, +toyId);
  }
}
