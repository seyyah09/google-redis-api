import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/createProduct-dto';
import { Product } from 'src/typeorm/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,)
    {}

    async create(createProductDto: CreateProductDto) {
        const productCheck = await this.findByCode(createProductDto.code);
        if(productCheck) {
            return {
                message: `this product code:${createProductDto.code} already exists!`
            }
        }

        const prod = await this.productRepository.create(createProductDto);
        
        await this.productRepository.save(prod);
        
        return {
            message: "the product created as follows:",
            prod
        }
    }

    async findByCode(code: string) {
        return await this.productRepository.findOneBy({ code });        
    }

    async getAll() {
        return await this.productRepository.find({
            select: {
                id: true,
                productname: true,
                category: true,
                brand: true,
                price: true,
                reviewScore: true,
            }
        })
    }

    async getByCategory(category: string) {
        const result = await this.productRepository.find({
            where: {
            category: category
            },
            select: {
                id: true,
                productname: true,
                brand: true,
                price: true,
                reviewScore: true,
            }                
        })

        return {
            message: `products in category ${category}:`,
            result
        }
    }
}
