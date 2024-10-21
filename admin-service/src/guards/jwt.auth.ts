import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  private checkJwt;

  constructor() {
    
    this.checkJwt = auth({
      audience: process.env.AUTH0_AUDIENCE,
       
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      
    });
  }
  
  canActivate(context: ExecutionContext ){
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return new Promise<boolean>((resolve, reject) => {
      this.checkJwt(request, response, (err) => {
        console.log(request)
        if (err) {
          return reject(false);
        }
        return resolve(true);
      });
    });
  }
}
