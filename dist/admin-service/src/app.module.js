"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("./app.routes");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entitiy_1 = require("./entities/admin.entitiy");
const session_entity_1 = require("./entities/session.entity");
const methods_service_1 = require("./methods/methods.service");
const auth_service_1 = require("./guards/auth.service");
const jwt_1 = require("@nestjs/jwt");
const forgetPass_entity_1 = require("./entities/forgetPass.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const adminController_1 = require("./controller/adminController/adminController");
const userController_1 = require("./controller/adminController/userController");
const vendorController_1 = require("./controller/adminController/vendorController");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const user_entity_1 = require("./entities/user.entity");
const app_routes_2 = require("./app.routes");
const vendor_entity_1 = require("./entities/vendor.entity");
const user_controller_1 = require("./controller/userController/user.controller");
const vendor_controller_1 = require("./controller/vendorController/vendor.controller");
const cloudinary_1 = require("./filehandling/cloudinary");
const stream_cloudinary_1 = require("./controller/fileController/stream.cloudinary");
const cloudinary_entity_1 = require("./entities/cloudinary.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/static',
            }),
            jwt_1.JwtModule.register({
                secret: '123456',
                signOptions: { expiresIn: '5m' },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                synchronize: false,
                database: 'AdminTesting',
                entities: [admin_entitiy_1.Admin, session_entity_1.Session, forgetPass_entity_1.OTPGen, vendor_entity_1.Vendor, user_entity_1.User,
                    __dirname + '/**/*.entity{.ts, .js}'
                ],
            }),
            typeorm_1.TypeOrmModule.forFeature([admin_entitiy_1.Admin, session_entity_1.Session, forgetPass_entity_1.OTPGen, user_entity_1.User, vendor_entity_1.Vendor, cloudinary_entity_1.UploadFile]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.mailtrap.io',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: '"No Reply" <no-reply@mailtrap.io>',
                },
            }),
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        ],
        controllers: [app_routes_1.AdminRoutes, app_routes_2.ViewRoutes, app_routes_1.UserSelfRoute, app_routes_1.VendorSelfRoute, stream_cloudinary_1.UploadController],
        providers: [methods_service_1.MethodServic, adminController_1.adminController, userController_1.userController, vendorController_1.vendorController, auth_service_1.AuthService, user_controller_1.userController1, vendor_controller_1.vendorController1, cloudinary_1.CloudinaryService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map