import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'api/user/user.service';
import { AdminRequest } from '@contler/core/models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('admin')
  createAdmin(@Body() data: AdminRequest) {
    return this.userService.createAdmin(data);
  }
}
