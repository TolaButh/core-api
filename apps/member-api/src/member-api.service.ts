import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
