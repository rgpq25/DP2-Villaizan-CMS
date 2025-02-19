import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get('/')
  async getCategorias() {
    return await this.categoriaService.getCategorias();
  }

  @Post('/')
  async createCategoria(@Body() dto: CreateCategoriaDto) {
    return await this.categoriaService.createCategoria(dto);
  }

  @Put('/:id')
  async updateCategoria(
    @Param('id') id: string,
    @Body() dto: CreateCategoriaDto,
  ) {
    return await this.categoriaService.updateCategoria(id, dto);
  }

  @Delete('/:id')
  async deleteCategoria(@Param('id') id: string) {
    return await this.categoriaService.deleteCategoria(id);
  }
}
