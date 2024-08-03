import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
export interface Error {
  error: string;
}
@Injectable()
export class UsersService {
  //añadir base de datos
  constructor(private prisma: PrismaService) {}

  // users: CreateUserDto[] = [
  //   { id: 1, name: 'Jhon', last: 'James' },
  //   { id: 2, name: 'Marvin', last: 'Berrio' },
  // ];

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        projects: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }

  // getUser(id: string): CreateUserDto | Error {
  //   const userId = parseInt(id, 10);
  //   const user = this.user.find((u) => u.id === userId);
  //   return user ? user : { error: 'Not Found' };
  // }

  async getUser(id: string): Promise<CreateUserDto> {
    // const userId = parseInt(id, 10);
    console.log(id);
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          projects: {
            include: {
              tasks: true,
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(` user with ID ${id} not found`);
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(user);

    if (!user) {
      throw new ErrorEvent('Not found');
    }
    return user;
  }

  // create(user: CreateUserDto) {
  //   this.users.push({
  //     ...user,
  //     id: this.users.length + 1,
  //   });
  //   return user;
  // }

  async create(user: CreateUserDto): Promise<User> {
    console.log(user);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const userData = { ...user, password: hashedPassword };
    return this.prisma.user.create({ data: userData });
  }

  async delete(id: string) {
    console.log(id);
    const user = await this.getUser(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`project with ID ${id} not found`);
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
