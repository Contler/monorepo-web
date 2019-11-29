import { Body, Controller, Post } from '@nestjs/common';
import { GuestRequest } from '@contler/core/models';
import { GuestService } from 'api/guest/guest.service';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Post('')
  saveGuest(@Body() guestRequest: GuestRequest) {
    return this.guestService.createGuest(guestRequest);
  }
}
