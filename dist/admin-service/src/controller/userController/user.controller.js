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
exports.userController1 = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const methods_service_1 = require("../../methods/methods.service");
const admin_entitiy_1 = require("../../entities/admin.entitiy");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const auth_service_1 = require("../../guards/auth.service");
const user_entity_1 = require("../../entities/user.entity");
const vendor_entity_1 = require("src/entities/vendor.entity");
const codes_1 = require("../../helpers/codes");
const messages_1 = require("src/helpers/messages");
let userController1 = class userController1 {
    constructor(adminRepository, userRepository, vendorRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async UserSignup(SignupDto) {
        const message = (0, messages_1.messages)(SignupDto.language ?? 'English');
        try {
            const email = SignupDto.email.toLowerCase();
            const { name, contact } = SignupDto;
            if (!email || !name || !contact) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const resultEmail = emailRegex.test(email);
            if (resultEmail == false) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.somethingWrong,
                };
            }
            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.AlreadyExists
                };
            }
            else {
                const check_user = await this.userRepository.findOne({ where: { email } });
                console.log(check_user);
                const token = await this.authService.generateToken();
                console.log(token);
                const pass = await this.methodsService.generateRandomPassword(5);
                const Send_email = await this.methodsService.sendEmail({ 'email': email, 'newOTP': pass });
                console.log(Send_email);
                const newPass = await this.methodsService.hashpass(pass);
                console.log(newPass);
                if (!check_user) {
                    var User_obj = {
                        name: name,
                        email: email,
                        password: newPass,
                        contact: contact,
                        isActive: true,
                        isDelete: false,
                        createdAt: new Date(),
                        updateAt: new Date()
                    };
                    const savedUser = await this.userRepository.save(User_obj);
                    const session = {
                        userId: savedUser.id.toString(),
                        type: 'user',
                        token: token,
                    };
                    const savedSession = await this.sessionRepository.save(session);
                    console.log(savedSession);
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: { savedUser, pass, User_obj },
                        session: savedSession,
                    };
                }
                else {
                    var id = check_user.id.toString();
                    console.log(id);
                    var session = await this.sessionRepository.findOne({ where: { userId: id } });
                    if (session && session.token) {
                        var tokenData = session.token;
                    }
                    else {
                        var sessionToken = {
                            userId: check_user.id.toString(),
                            type: 'user',
                            token: token,
                        };
                        var savedSession = await this.sessionRepository.save(sessionToken);
                        var tokenData = token;
                    }
                    var userDetails = {
                        '_id': check_user.id.toString(),
                        'name': check_user.name,
                        'email': check_user.email,
                        'language': check_user.language,
                        'role': check_user.role,
                        'isActive': check_user.isActive,
                        'token': tokenData
                    };
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: userDetails
                    };
                }
            }
        }
        catch (error) {
            console.log('Error during vendor signup:', error);
            return {
                code: codes_1.codes.serverError,
                message: message.success,
                result: error.message
            };
        }
    }
    async userLogin(UserLoginDto) {
        const message = (0, messages_1.messages)(UserLoginDto.language ?? 'English');
        try {
            const email = UserLoginDto.email.toLowerCase();
            console.log(email);
            const password = UserLoginDto.password;
            console.log(password);
            if (!email || !password) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const user = await this.userRepository.findOne({ where: { email } });
            if (user && user.password) {
                const id = user.id.toString();
                console.log(id);
                const password_status = await this.methodsService.verifyPassword({ 'plainPassword': password, 'hashedPassword': user.password });
                if (password_status == false) {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.invalidPass
                    };
                }
                else {
                    var token = await this.authService.generateToken();
                    const checkSession = await this.sessionRepository.delete({ userId: id });
                    var sessionToken = {
                        'userId': user.id.toString(),
                        'token': token,
                        'type': 'user'
                    };
                    const savedSessionToken = await this.sessionRepository.save(sessionToken);
                    var userDetails = {
                        '_id': user.id.toString(),
                        'email': user.email,
                        'name': user.name,
                        'language': user.language,
                        'isActive': user.isActive,
                        'token': token
                    };
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: userDetails
                    };
                }
            }
            else {
                return {
                    code: codes_1.codes.badRequest,
                    merssage: message.notFound
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
    async userLogout(UserLogoutDto) {
        const message = (0, messages_1.messages)(UserLogoutDto.language ?? 'English');
        try {
            console.log("Rohit testing");
            const id = UserLogoutDto.user_id;
            console.log(id);
            if (!id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const update = await this.sessionRepository.delete({ userId: id });
                console.log(update);
                if (update) {
                    return {
                        code: codes_1.codes.success,
                        message: message.success
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.notFound
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
    async validUser(validUserDto) {
        const message = (0, messages_1.messages)(validUserDto.language ?? 'English');
        try {
            const { type, email, contact } = validUserDto;
            if (!type || !email || !contact) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            if (type === 'user') {
                const user = await this.userRepository.findOne({ where: { email } });
                if (user) {
                    return {
                        code: codes_1.codes.success,
                        message: message.success
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.notFound
                    };
                }
            }
            else if (type === 'vendor') {
                const vendor = await this.vendorRepository.findOne({ where: { contact } });
                if (vendor) {
                    return {
                        code: codes_1.codes.success,
                        message: message.success
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.notFound
                    };
                }
            }
            else {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.BadRequest
                };
            }
        }
        catch (error) {
            console.error(error);
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
            if (!oldpassword || !newpassword || !email) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
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
                const validatePassword = await this.methodsService.verifyPassword({ 'plainPassword': oldpassword, 'hashedPassword': check.password });
                console.log(validatePassword);
                if (validatePassword == true) {
                    const newPass = await this.methodsService.hashpass(newpassword);
                    let check = await this.userRepository.update(user_id, { password: newPass });
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: check
                    };
                }
                else {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.BadRequest
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
    async forgetPass(forgetPassDto) {
        const message = (0, messages_1.messages)(forgetPassDto.language ?? 'English');
        try {
            const { email } = forgetPassDto;
            console.log(email);
            if (!email) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
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
        }
        catch (error) {
            return {
                code: codes_1.codes.serverError,
                message: message.success,
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
                        message: message.BadRequest,
                        result: otpStatus
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
    async EditUserProfile(EditUserDto) {
        const message = (0, messages_1.messages)(EditUserDto.language ?? 'English');
        try {
            const data = EditUserDto;
            console.log(data.email);
            const status = data.status;
            const _id = data.user_id;
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const check = await this.userRepository.findOne(_id);
            if (check) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const result1 = emailRegex.test(data.email);
                if (result1 == false) {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.notFound,
                        result: result1
                    };
                }
                const contact = check.contact;
                let status1 = check.isActive;
                if (status === 'Active') {
                    status1 = true;
                }
                else if (status === 'Inactive') {
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
                message: message.success,
                result: error.message
            };
        }
    }
    async ProDetails(UserProfileDto) {
        const message = (0, messages_1.messages)(UserProfileDto.language ?? 'English');
        try {
            const reqData = UserProfileDto;
            const _id = reqData.user_id;
            console.log(_id);
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const check = await this.userRepository.findOne(_id);
            console.log(check);
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
                message: message.success,
                result: error.message
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
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
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
                        message: message.notFound,
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
    async listing(userListingDto) {
        const message = (0, messages_1.messages)(userListingDto.language ?? 'English');
        try {
            const data = userListingDto;
            const page = data.pageNo || 1;
            const page1 = parseInt(page, 10);
            const perPage = data.perPage || 10;
            const perPage1 = parseInt(perPage, 10);
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
                message: message.serverError
            };
        }
    }
    async DeleteUser(DeleteUserDto) {
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
                message: message.serverError
            };
        }
    }
};
exports.userController1 = userController1;
exports.userController1 = userController1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(3, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(4, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], userController1);
//# sourceMappingURL=user.controller.js.map