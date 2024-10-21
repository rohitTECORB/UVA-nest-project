"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_openid_connect_1 = require("express-openid-connect");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: configService.get('SECRET'),
        clientId: configService.get('CLIENT_ID'),
        issuerBaseURL: configService.get('ISSUER_BASE_URL'),
    };
    app.use((0, express_openid_connect_1.auth)(config));
    app.setGlobalPrefix('api');
    const port = configService.get('PORT') || 3000;
    await app.listen(port, () => {
        console.log('Google OAuth server is running on port:', `${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map