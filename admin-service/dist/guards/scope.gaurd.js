"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopesGuard = void 0;
const common_1 = require("@nestjs/common");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
let ScopesGuard = class ScopesGuard {
    constructor(requiredScope) {
        this.requiredScope = requiredScope;
        this.checkScopes = (0, express_oauth2_jwt_bearer_1.requiredScopes)(this.requiredScope);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            this.checkScopes(request, response, (err) => {
                if (err) {
                    return reject(false);
                }
                return resolve(true);
            });
        });
    }
};
exports.ScopesGuard = ScopesGuard;
exports.ScopesGuard = ScopesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], ScopesGuard);
//# sourceMappingURL=scope.gaurd.js.map