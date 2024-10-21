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
exports.vendorController1 = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const methods_service_1 = require("../../methods/methods.service");
const admin_entitiy_1 = require("../../entities/admin.entitiy");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const auth_service_1 = require("../../guards/auth.service");
const vendor_entity_1 = require("src/entities/vendor.entity");
const codes_1 = require("../../helpers/codes");
const messages_1 = require("src/helpers/messages");
let vendorController1 = class vendorController1 {
    constructor(adminRepository, vendorRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.vendorRepository = vendorRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async VendorSignup(SignupDto) {
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
            const existingVendor = await this.vendorRepository.findOne({ where: { email } });
            if (existingVendor) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.AlreadyExists
                };
            }
            else {
                const check_vendor = await this.vendorRepository.findOne({ where: { email } });
                console.log(check_vendor);
                const token = await this.authService.generateToken();
                console.log(token);
                const pass = await this.methodsService.generateRandomPassword(5);
                const Send_email = await this.methodsService.sendEmail({ 'email': email, 'newOTP': pass });
                console.log(Send_email);
                const newPass = await this.methodsService.hashpass(pass);
                console.log(newPass);
                if (!check_vendor) {
                    var Vendor_obj = {
                        name: name,
                        email: email,
                        password: newPass,
                        contact: contact,
                        isActive: true,
                        isDelete: false,
                        createdAt: new Date(),
                        updateAt: new Date()
                    };
                    const savedVendor = await this.vendorRepository.save(Vendor_obj);
                    const session = {
                        userId: savedVendor.id.toString(),
                        type: 'vendor',
                        token: token,
                    };
                    const savedSession = await this.sessionRepository.save(session);
                    console.log(savedSession);
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: { savedVendor, pass, Vendor_obj },
                        session: savedSession,
                    };
                }
                else {
                    var id = check_vendor.id.toString();
                    console.log(id);
                    const session = await this.sessionRepository.findOne({ where: { vendorId: id } });
                    if (session && session.token) {
                        var tokenData = session.token;
                    }
                    else {
                        var sessionToken = {
                            vendorId: check_vendor.id.toString(),
                            type: 'vendor',
                            token: token,
                        };
                        var savedSession = await this.sessionRepository.save(sessionToken);
                        var tokenData = token;
                    }
                    var vendorDetails = {
                        '_id': check_vendor.id.toString(),
                        'name': check_vendor.name,
                        'email': check_vendor.email,
                        'language': check_vendor.language,
                        'role': check_vendor.role,
                        'isActive': check_vendor.isActive,
                        'token': tokenData
                    };
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: vendorDetails
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
    async vendorLogin(vendorLoginDto) {
        const message = (0, messages_1.messages)(vendorLoginDto.language ?? 'English');
        try {
            const email = vendorLoginDto.email.toLowerCase();
            console.log(email);
            const password = vendorLoginDto.password;
            console.log(password);
            if (!email || !password) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const vendor = await this.vendorRepository.findOne({ where: { email } });
            if (vendor && vendor.password) {
                const id = vendor.id.toString();
                console.log(id);
                const password_status = await this.methodsService.verifyPassword({ 'plainPassword': password, 'hashedPassword': vendor.password });
                if (password_status == false) {
                    return {
                        code: codes_1.codes.badRequest,
                        message: message.invalidPass
                    };
                }
                else {
                    var token = await this.authService.generateToken();
                    const checkSession = await this.sessionRepository.delete({ vendorId: id });
                    var sessionToken = {
                        'vendorId': vendor.id.toString(),
                        'token': token,
                        'type': 'vendor'
                    };
                    const savedSessionToken = await this.sessionRepository.save(sessionToken);
                    var vendorDetails = {
                        '_id': vendor.id.toString(),
                        'email': vendor.email,
                        'name': vendor.name,
                        'language': vendor.language,
                        'isActive': vendor.isActive,
                        'token': token
                    };
                    return {
                        code: codes_1.codes.success,
                        message: message.success,
                        result: vendorDetails
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
    async vendorLogout(vendorLogoutDto) {
        const message = (0, messages_1.messages)(vendorLogoutDto.language ?? 'English');
        try {
            console.log("Rohit testing");
            const id = vendorLogoutDto.vendor_id;
            console.log(id);
            if (!id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const update = await this.sessionRepository.delete({ vendorId: id });
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
    async validVendor(validVendorDto) {
        const message = (0, messages_1.messages)(validVendorDto.language ?? 'English');
        try {
            const { type, email, contact } = validVendorDto;
            if (!type || !email || !contact) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            if (type === 'vendor') {
                const vendor = await this.vendorRepository.findOne({ where: { email } });
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
            let check = await this.vendorRepository.findOne({ where: { email } });
            console.log(check);
            console.log(check.password);
            const vendor_id = check.id.toString();
            console.log(vendor_id);
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
                    let check = await this.vendorRepository.update(vendor_id, { password: newPass });
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
                const check = await this.vendorRepository.findOne({ where: { email } });
                if (check) {
                    const vendor_id = check.id.toString();
                    const newOTP = await this.methodsService.generateOTP(4);
                    const saved_OTP = {
                        vendor_id,
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
                    const newcheck = await this.vendorRepository.findOne({ where: { email } });
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
    async EditVendorProfile(EditVendorDto) {
        const message = (0, messages_1.messages)(EditVendorDto.language ?? 'English');
        try {
            const data = EditVendorDto;
            console.log(data.email);
            const status = data.status;
            const _id = data.vendor_id;
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const check = await this.vendorRepository.findOne(_id);
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
                const savedObj = await this.vendorRepository.update(_id, updatedData);
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
    async ProDetails(VendorProfileDto) {
        const message = (0, messages_1.messages)(VendorProfileDto.language ?? 'English');
        try {
            const reqData = VendorProfileDto;
            const _id = reqData.vendor_id;
            console.log(_id);
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            const check = await this.vendorRepository.findOne(_id);
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
    async UpdatevendorStatus(VendorStatusUpdateDto) {
        const message = (0, messages_1.messages)(VendorStatusUpdateDto.language ?? 'English');
        try {
            const reqData = VendorStatusUpdateDto;
            const status = reqData.status;
            console.log(status);
            const _id = reqData.vendor_id;
            console.log(_id);
            if (!_id) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const check = await this.vendorRepository.findOne(_id);
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
                    const updatedStatus = await this.vendorRepository.update(_id, new_Obj);
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
    async listing(vendorListingDto) {
        const message = (0, messages_1.messages)(vendorListingDto.language ?? 'English');
        try {
            const data = vendorListingDto;
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
            const total = await this.vendorRepository.count(obj_data);
            const usrData = await this.vendorRepository.find({
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
                    vendor_id: id,
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
    async DeleteVendor(DeleteVendorDto) {
        const message = (0, messages_1.messages)(DeleteVendorDto.language ?? 'English');
        try {
            const data = DeleteVendorDto;
            const id = data.vendor_id;
            console.log(id);
            const chck = await this.vendorRepository.findOne(id);
            if (!chck) {
                return {
                    code: codes_1.codes.badRequest,
                    message: message.notFound
                };
            }
            else {
                const vendorDeleted = await this.vendorRepository.update(id, { isDelete: true });
                return {
                    code: codes_1.codes.success,
                    message: message.success,
                    result: vendorDeleted
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
exports.vendorController1 = vendorController1;
exports.vendorController1 = vendorController1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(2, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(3, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], vendorController1);
//# sourceMappingURL=vendor.controller.js.map