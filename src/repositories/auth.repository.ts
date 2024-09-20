import { PrismaService } from "../database/prisma.service";
import { User } from "@prisma/client";
import { RegisterDto } from "../dto/user.dto";
import {Repository} from "./repository";
import {UsernameInUseException} from "../utils/exceptions/unauthorized.exception";

export class AuthRepository extends Repository {

    async findByUsername(username: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { username },
        });
    }

    async create(registerDto: RegisterDto): Promise<User> {
        return this.db.user.create({
            data: {
                username: registerDto.username,
                email: registerDto.email,
                password: registerDto.password,
                name: registerDto.name,
            },
        });
    }
}
