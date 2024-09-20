import {UsernameInUseException} from "../utils/exceptions/unauthorized.exception";
import {PrismaService} from "../database/prisma.service";
import {User} from "@prisma/client";
import {Users} from "../models/user.model";


export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async registerUser(data: Users): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existing) {
      throw new UsernameInUseException();
    }
    return this.prisma.user.create({
      data,
    });
  }
}