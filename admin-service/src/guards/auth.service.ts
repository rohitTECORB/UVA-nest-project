import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
 
  async generateToken(){
    const token = crypto.randomBytes(48).toString('hex');
    return token;
  }
}
