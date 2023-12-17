import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/createProduct-dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {};
    
    @Post('create')
    async createProduct(@Body() dto: CreateProductDto) {
        return  {
            product: await this.productService.create(dto)
        }
    };
}

