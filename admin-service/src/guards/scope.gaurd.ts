import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

@Injectable()
export class ScopesGuard implements CanActivate {
  private checkScopes;

  constructor(private requiredScope: string) {
    // Configure the scope validation middleware
    this.checkScopes = requiredScopes(this.requiredScope);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Use the Auth0 middleware to check scopes
    return new Promise<boolean>((resolve, reject) => {
      this.checkScopes(request, response, (err) => {
        if (err) {
          return reject(false);
        }
        return resolve(true);
      });
    });
  }
}
