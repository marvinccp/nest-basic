import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiTags('users')
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }
  @ApiTags('users')
  @Get('/:id')
  @HttpCode(200)
  geOneUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.getUser(id);
  }



  
  @ApiTags('users')
  @Post()
  @UsePipes(new ValidationPipe())
  createNewUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.delete(id);
  }
}
