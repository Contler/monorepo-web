import { Injectable } from '@nestjs/common';
import { environment } from 'api/environments/environment';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return ({ message: 'Welcome to api!' + environment.production });
  }
}
