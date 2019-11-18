import { Body, Controller, Post } from '@nestjs/common';
import { AdminRequest } from '@contler/core';
import { UserService } from 'api/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('admin')
  createAdmin(@Body() data: AdminRequest) {
    return this.userService.createAdmin(data);
  }
}
