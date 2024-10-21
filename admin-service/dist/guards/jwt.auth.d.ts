import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class JwtAuthGuard implements CanActivate {
    private checkJwt;
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
