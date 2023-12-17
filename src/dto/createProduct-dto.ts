import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    code:string;
    
    @IsNotEmpty()
    @IsString()
    productname:string;

    @IsString()
    category:string;

    @IsString()
    brand:string;

    @IsNumber()
    price:number;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}