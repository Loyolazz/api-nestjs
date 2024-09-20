import {Module} from "@nestjs/common";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
import {PrismaService} from "../database/prisma.service";
import {JwtStrategy} from "../authentication/jwt.strategy";
import {UserService} from "../services/user.service";
import {AuthRepository} from "../repositories/auth.repository";
import {UserModule} from "./user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";


@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UserService, AuthRepository],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ]
})
export class AuthModule{}