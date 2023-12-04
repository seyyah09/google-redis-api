import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    username:string;

    @IsString()
    password:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}