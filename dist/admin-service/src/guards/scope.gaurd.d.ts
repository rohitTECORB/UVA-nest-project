import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ScopesGuard implements CanActivate {
    private requiredScope;
    private checkScopes;
    constructor(requiredScope: string);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
