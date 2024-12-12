import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt'; // или argon2

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async listUsers() {
    return this.prisma.user.findMany();
  }

  public async createUser(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { email, password: hashed },
    });
  }
}
