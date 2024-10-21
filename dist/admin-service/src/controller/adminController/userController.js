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
exports.userController = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const methods_service_1 = require("../../methods/methods.service");
const admin_entitiy_1 = require("../../entities/admin.entitiy");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const auth_service_1 = require("../../guards/auth.service");
const user_entity_1 = require("../../entities/user.entity");
const codes_1 = require("src/helpers/codes");
const messages_1 = require("src/helpers/messages");
let userController = class userController {
    constructor(adminRepository, userRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async addUser(SignupDto) {
        const message = (0, messages_1.messages)(SignupDto.language ?? 'English');
        try {
            const { email, name, contact } = SignupDto;
            console.log(email, name, contact);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const resultEmail = emailRegex.test(email);
            console.log(resultEmail);
            if (resultEmail == false) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.somethingWrong,
                };
            }
            const existingVendor = await this.userRepository.findOne({ where: { email } });
            if (existingVendor) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.AlreadyExists
                };
            }
            else {
                const check_user = await this.userRepository.findOne({ where: { email } });
                console.log(check_user);
                const token = await this.authService.generateToken();
                const pass = await this.methodsService.generateRandomPassword(5);
                await this.methodsService.sendEmail({ 'email': email, 'newOTP': pass });
                const newPass = await this.methodsService.hashpass(pass);
                var user_obj = {
                    name: name,
                    email: email,
                    password: newPass,
                    contact: contact,
                    isActive: true,
                    isDelete: false,
                    createdAt: new Date(),
                    updateAt: new Date()
                };
                const savedUser = await this.userRepository.save(user_obj);
                const session = {
                    userId: savedUser.id.toString(),
                    type: 'user',
                    token: token,
                };
                const savedSession = await this.sessionRepository.save(session);
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: { savedUser, pass },
                    session: savedSession,
                };
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
    async updatePassword(updatePasswordDto) {
        const message = (0, messages_1.messages)(updatePasswordDto.language ?? 'English');
        try {
            const { oldpassword, newpassword, email } = updatePasswordDto;
            console.log(oldpassword);
            console.log(newpassword);
            console.log(email);
            let check = await this.userRepository.findOne({ where: { email } });
            console.log(check);
            console.log(check.password);
            const user_id = check.id.toString();
            console.log(user_id);
            if (!check) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                console.log(typeof (oldpassword));
                const validatePassword = await this.methodsService.verifyPassword({ plainPassword: oldpassword, hashedPassword: check.password });
                console.log(validatePassword);
                if (validatePassword == true) {
                    let haspass1 = await this.methodsService.hashpass(newpassword);
                    let check = await this.userRepository.update(user_id, { password: haspass1 });
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: check, newpassword
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.somethingWrong
                    };
                }
            }
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async forgetPass(forgetPassDto) {
        const message = (0, messages_1.messages)(forgetPassDto.language ?? 'English');
        try {
            const { email } = forgetPassDto;
            console.log(email);
            const check = await this.userRepository.findOne({ where: { email } });
            if (check) {
                const user_id = check.id.toString();
                const newOTP = await this.methodsService.generateOTP(4);
                const saved_OTP = {
                    user_id,
                    newOTP,
                    email
                };
                const savedOTP = await this.otpRepository.save(saved_OTP);
                const send_email = await this.methodsService.sendEmail({ newOTP, email });
            }
            else {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async varifyOTP(ForgetPassDto) {
        const message = (0, messages_1.messages)(ForgetPassDto.language ?? 'English');
        try {
            const { email, OTP } = ForgetPassDto;
            console.log(email);
            console.log(OTP);
            const check = await this.otpRepository.findOne({ where: { email } });
            if (!check) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const otpStatus = await this.methodsService.verifyOTP({ 'dbOTP': check.newOTP, '_otp': OTP });
                if (otpStatus == true) {
                    const newcheck = await this.userRepository.findOne({ where: { email } });
                    const pass = newcheck.password;
                    const send_email = await this.methodsService.sendEmail1({ pass, email });
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: otpStatus
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.invalidPass,
                        result: otpStatus
                    };
                }
            }
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async EditUserProfile(EditUserDto) {
        const message = (0, messages_1.messages)(EditUserDto.language ?? 'English');
        try {
            const data = EditUserDto;
            console.log(data.email);
            const status = data.status;
            const _id = data.user_id;
            const check = await this.userRepository.findOne(_id);
            if (check) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const result1 = emailRegex.test(data.email);
                if (data.email && !result1) {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.BadRequest,
                        result: result1
                    };
                }
                const contact = check.contact;
                let status1 = check.isActive;
                if (status === 'Active') {
                    status1 = true;
                }
                else if (status === 'Deactive') {
                    status1 = false;
                }
                const updatedData = {
                    name: data.name ? data.name : check.name,
                    email: data.email ? data.email : check.email,
                    contact: data.contact ? data.contact : contact,
                    isActive: status1,
                    updatedAt: new Date()
                };
                const savedObj = await this.userRepository.update(_id, updatedData);
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: savedObj,
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
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message,
            };
        }
    }
    async userProfileDetails(UserProfileDto) {
        const message = (0, messages_1.messages)(UserProfileDto.language ?? 'English');
        try {
            const reqData = UserProfileDto;
            const _id = reqData.user_id;
            const check = await this.userRepository.findOne(_id);
            if (!check) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: check
                };
            }
        }
        catch (error) {
            console.error(error);
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message,
            };
        }
    }
    async UpdateuserStatus(UserStatusUpdateDto) {
        const message = (0, messages_1.messages)(UserStatusUpdateDto.language ?? 'English');
        try {
            const reqData = UserStatusUpdateDto;
            const status = reqData.status;
            console.log(status);
            const _id = reqData.user_id;
            console.log(_id);
            const check = await this.userRepository.findOne(_id);
            console.log(check);
            if (check) {
                if (status == 'Active') {
                    var new_Obj = {
                        'isActive': true
                    };
                }
                else {
                    var new_Obj = {
                        'isActive': false
                    };
                }
                const updatedStatus = await this.userRepository.update(_id, new_Obj);
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: updatedStatus
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
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async userlisting(userListingDto) {
        const message = (0, messages_1.messages)(userListingDto.language ?? 'English');
        try {
            const data = userListingDto;
            const page = data.pageNo || 1;
            const page1 = parseInt(page, 10);
            console.log(page1);
            const perPage = data.perPage || 10;
            const perPage1 = parseInt(perPage, 10);
            console.log(perPage1);
            let obj_data = { 'isDelete': false };
            if (data.search && data.search.trim() !== '' && data.toDate && data.fromDate) {
                obj_data = {
                    $or: [
                        { name: { '$regex': data.search, '$options': 'i' } },
                        { email: { '$regex': data.search, '$options': 'i' } },
                        { contact: { '$regex': data.search, '$options': 'i' } }
                    ],
                    isDelete: false,
                    createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
                };
            }
            else if (data.search && data.search !== '') {
                obj_data = {
                    $or: [
                        { name: { '$regex': data.search, '$options': 'i' } },
                        { email: { '$regex': data.search, '$options': 'i' } },
                        { contact: { '$regex': data.search, '$options': 'i' } }
                    ],
                    isDelete: false,
                };
            }
            else if (data.fromDate && data.toDate) {
                obj_data = {
                    createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
                    isDelete: false
                };
            }
            const total = await this.userRepository.count(obj_data);
            const usrData = await this.userRepository.find({
                where: obj_data,
                order: {
                    createdAt: 'DESC',
                },
                skip: (page1 - 1) * perPage1,
                take: perPage1,
            });
            const length = usrData.length;
            console.log(length);
            var newObj_data = [];
            var obj_data1 = {};
            var status1;
            for (let i = 0; i < length; i++) {
                var objectId = usrData[i].id;
                var id = objectId.toString();
                obj_data1 = {
                    name: usrData[i].name,
                    email: usrData[i].email,
                    contact: usrData[i].contact,
                    user_id: id,
                    status: usrData[i].isActive,
                    createdAt: moment(usrData[i].createdAt).format('YYYY/MM/DD'),
                };
                newObj_data.push(obj_data1);
            }
            return {
                code: codes_1.codes.success,
                message: message.success,
                result: newObj_data, total
            };
        }
        catch (error) {
            console.error('Error occurred:', error);
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
    async adminDeleteUser(DeleteUserDto) {
        const message = (0, messages_1.messages)(DeleteUserDto.language ?? 'English');
        try {
            const data = DeleteUserDto;
            const id = data.user_id;
            console.log(id);
            const chck = await this.userRepository.findOne(id);
            if (!chck) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const userDeleted = await this.userRepository.update(id, { isDelete: true });
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: userDeleted
                };
            }
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.serverError,
                result: error.message
            };
        }
    }
};
exports.userController = userController;
exports.userController = userController = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(3, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], userController);
//# sourceMappingURL=userController.js.map