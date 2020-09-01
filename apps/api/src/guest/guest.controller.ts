import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { GuestRequest } from '@contler/models';
import { GuestService } from 'api/guest/guest.service';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Post('')
  saveGuest(@Body() guestRequest: GuestRequest) {
    return this.guestService.createGuest(guestRequest);
  }

  @Delete('/:id')
  deleteGuest(@Param() params: { id: string }) {
    return this.guestService.deleteGuest(params.id);
  }
}
