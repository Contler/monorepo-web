import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserService } from 'api/user/user.service';
import { AdminRequest, EmployerRequest } from '@contler/models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('admin')
  createAdmin(@Body() data: AdminRequest) {
    return this.userService.createAdmin(data);
  }

  @Post('employer')
  createEmployer(@Body() data: EmployerRequest) {
    return this.userService.createEmployer(data);
  }

  @Delete('employer/:id')
  deleteEmployer(@Param() params: {id: string}) {
    return this.userService.deleteUser(params.id);
  }
}
