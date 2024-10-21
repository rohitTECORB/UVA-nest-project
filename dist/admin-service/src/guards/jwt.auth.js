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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
let JwtAuthGuard = class JwtAuthGuard {
    constructor() {
        this.checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
            audience: process.env.AUTH0_AUDIENCE,
            issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        });
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            this.checkJwt(request, response, (err) => {
                console.log(request);
                if (err) {
                    return reject(false);
                }
                return resolve(true);
            });
        });
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtAuthGuard);
//# sourceMappingURL=jwt.auth.js.map