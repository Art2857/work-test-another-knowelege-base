import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listUsers() {
    return this.usersService.listUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }
}
