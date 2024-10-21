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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entitiy_1 = require("../../entities/admin.entitiy");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const methods_service_1 = require("../../methods/methods.service");
const auth_service_1 = require("../../guards/auth.service");
const codes_1 = require("../../helpers/codes");
const messages_1 = require("src/helpers/messages");
let adminController = class adminController {
    constructor(adminRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async adminSignup(SignupDto) {
        const message = (0, messages_1.messages)(SignupDto.language ?? 'English');
        try {
            const { email, name, contact } = SignupDto;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const resultEmail = emailRegex.test(email);
            console.log(resultEmail);
            if (resultEmail == false) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.somethingWrong,
                };
            }
            const existingVendor = await this.adminRepository.findOne({ where: { email } });
            if (existingVendor) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.AlreadyExists
                };
            }
            else {
                const check_admin = await this.adminRepository.findOne({ where: { email } });
                console.log(check_admin);
                const token = await this.authService.generateToken();
                console.log(token);
                const pass = await this.methodsService.generateRandomPassword(5);
                const Send_email = await this.methodsService.sendEmail({ 'email': email, 'newOTP': pass });
                console.log(Send_email);
                const newPass = await this.methodsService.hashpass(pass);
                console.log(newPass);
                if (!check_admin) {
                    var admin_obj = {
                        name: name,
                        email: email,
                        password: newPass,
                        contact: contact,
                        isActive: true,
                        isDelete: false,
                        createdAt: new Date(),
                        updateAt: new Date()
                    };
                    const savedAdmin = await this.adminRepository.save(admin_obj);
                    const session = {
                        vendorId: savedAdmin.id.toString(),
                        type: '',
                        token: token,
                    };
                    const savedSession = await this.sessionRepository.save(session);
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: { savedAdmin, pass },
                        session: savedSession,
                    };
                }
            }
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.success,
                result: error.message
            };
        }
    }
    async login(LoginDto) {
        const message = (0, messages_1.messages)(LoginDto.language ?? 'English');
        try {
            const { password, email } = LoginDto;
            const check = await this.adminRepository.findOne({ where: { email } });
            if (!check) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                let passwordStatus = await this.methodsService.verifyPassword({ 'plainPassword': password, 'hashedPassword': check.password });
                if (passwordStatus == false) {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.BadRequest
                    };
                }
                else {
                    const check_id = check.id.toString();
                    let token = await this.authService.generateToken();
                    console.log(token);
                    let dlt_session = await this.sessionRepository.delete({ userId: check_id });
                    let obj = {
                        'adminId': check_id,
                        'tokens': token,
                        'type': 'admin',
                        'timeStamp': Date.now()
                    };
                    let save_session = await this.sessionRepository.save(obj);
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: token,
                        session: save_session
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async logout(LogoutDto) {
        const message = (0, messages_1.messages)(LogoutDto.language ?? 'English');
        try {
            const { email } = LogoutDto;
            console.log(email);
            const check = await this.adminRepository.findOne({ where: { email } });
            console.log(check);
            if (check) {
                const check_id = check.id.toString();
                console.log(check_id);
                var deletedUser = await this.sessionRepository.delete({ adminId: check_id });
                console.log(deletedUser);
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: deletedUser
                };
            }
            else {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
};
exports.adminController = adminController;
exports.adminController = adminController = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], adminController);
//# sourceMappingURL=adminController.js.map