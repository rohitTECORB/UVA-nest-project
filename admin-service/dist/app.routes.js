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
exports.VendorSelfRoute = exports.UserSelfRoute = exports.AdminRoutes = exports.ViewRoutes = void 0;
const common_1 = require("@nestjs/common");
const adminController_1 = require("./controller/adminController/adminController");
const userController_1 = require("./controller/adminController/userController");
const vendorController_1 = require("./controller/adminController/vendorController");
const user_dto_1 = require("./dto/user.dto");
const auth_dto_1 = require("./dto/auth.dto");
const path_1 = require("path");
const vendor_dto_1 = require("./dto/vendor.dto");
const user_controller_1 = require("./controller/userController/user.controller");
const vendor_controller_1 = require("./controller/vendorController/vendor.controller");
const validationPipe_1 = require("./helpers/validationPipe");
const ValidationSchema_1 = require("./helpers/ValidationSchema");
let ViewRoutes = class ViewRoutes {
    getUser(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'user.html'));
    }
    getVendor(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'vendor.html'));
    }
    getAdmin(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'admin.html'));
    }
    signupUser(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'signup.html'));
    }
    loginUser(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'login.html'));
    }
};
exports.ViewRoutes = ViewRoutes;
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewRoutes.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('vendor'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewRoutes.prototype, "getVendor", null);
__decorate([
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewRoutes.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('signup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewRoutes.prototype, "signupUser", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewRoutes.prototype, "loginUser", null);
exports.ViewRoutes = ViewRoutes = __decorate([
    (0, common_1.Controller)('static')
], ViewRoutes);
let AdminRoutes = class AdminRoutes {
    constructor(adminController, userController, vendorController) {
        this.adminController = adminController;
        this.userController = userController;
        this.vendorController = vendorController;
    }
    async signup(SignupDto) {
        console.log('inide api');
        return await this.adminController.adminSignup(SignupDto);
    }
    async login(LoginDto) {
        return await this.adminController.login(LoginDto);
    }
    async logout(LogoutDto) {
        return await this.adminController.logout(LogoutDto);
    }
    async addNewUSer(AddNewUser) {
        return await this.userController.addUser(AddNewUser);
    }
    async updatePassword(UpdatePasswordDto) {
        return await this.userController.updatePassword(UpdatePasswordDto);
    }
    async forgetpassword(ForgetPassDto) {
        return await this.userController.forgetPass(ForgetPassDto);
    }
    async varifyOTP(ForgetPassDto) {
        return await this.userController.varifyOTP(ForgetPassDto);
    }
    async EditUserProfile(EditUserDto) {
        return await this.userController.EditUserProfile(EditUserDto);
    }
    async userProfileDetails(UserProfileDto) {
        return await this.userController.userProfileDetails(UserProfileDto);
    }
    async userUpdateStatus(UserProfileUpdateDto) {
        return await this.userController.UpdateuserStatus(UserProfileUpdateDto);
    }
    async userListing(userListingDto) {
        return await this.userController.userlisting(userListingDto);
    }
    async adminDeleteUser(DeleteUserDto) {
        return await this.userController.adminDeleteUser(DeleteUserDto);
    }
    async newVendorSignUp(VendorSignupDto) {
        return await this.vendorController.addVender(VendorSignupDto);
    }
    async updateVendorPassword(updatePasswordDto) {
        return await this.vendorController.updatePassword(updatePasswordDto);
    }
    async forgetPass(forgetPassDto) {
        return await this.vendorController.forgetPass(forgetPassDto);
    }
    async varifyVendorOTP(varifyVendorOTPDto) {
        return await this.vendorController.varifyOTP(varifyVendorOTPDto);
    }
    async EditVendorProfile(editVendorprofile) {
        return await this.vendorController.EditVendorProfile(editVendorprofile);
    }
    async vendorProfileDetails(vendorProfileDto) {
        console.log('enter controller');
        return await this.vendorController.vendorProfileDetails(vendorProfileDto);
    }
    async UpdatevendorStatus(updateVendorDto) {
        return await this.vendorController.UpdatevendorStatus(updateVendorDto);
    }
    async vendorlisting(vendorListingDto) {
        return await this.vendorController.vendorlisting(vendorListingDto);
    }
    async adminDeleteVendor(DeleteVendorDto) {
        return await this.vendorController.adminDeleteVendor(DeleteVendorDto);
    }
};
exports.AdminRoutes = AdminRoutes;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.addSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.LoginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.emailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('addUser'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.addSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "addNewUSer", null);
__decorate([
    (0, common_1.Patch)('updatePassword'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('forgetpassUser'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.emailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "forgetpassword", null);
__decorate([
    (0, common_1.Get)('varifyUserOTP'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.varifyPassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "varifyOTP", null);
__decorate([
    (0, common_1.Post)('EditUserProfile'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "EditUserProfile", null);
__decorate([
    (0, common_1.Get)('userProfileDetails'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "userProfileDetails", null);
__decorate([
    (0, common_1.Post)('userUpdateStatus'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdateStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "userUpdateStatus", null);
__decorate([
    (0, common_1.Get)('userListing'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.listing))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "userListing", null);
__decorate([
    (0, common_1.Post)('adminDeleteUser'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.deleteSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "adminDeleteUser", null);
__decorate([
    (0, common_1.Post)('addVender'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.addSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "newVendorSignUp", null);
__decorate([
    (0, common_1.Post)('updateVendorPass'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "updateVendorPassword", null);
__decorate([
    (0, common_1.Post)('forgetPassVendor'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.emailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "forgetPass", null);
__decorate([
    (0, common_1.Post)('varifyVendorOTP'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.varifyPassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "varifyVendorOTP", null);
__decorate([
    (0, common_1.Post)('EditVendorProfile'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "EditVendorProfile", null);
__decorate([
    (0, common_1.Get)('vendorProfileDetails'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "vendorProfileDetails", null);
__decorate([
    (0, common_1.Post)('UpdateVendorStatus'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdateStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "UpdatevendorStatus", null);
__decorate([
    (0, common_1.Get)('vendorlisting'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.listing))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "vendorlisting", null);
__decorate([
    (0, common_1.Post)('adminDeleteVendor'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.deleteSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminRoutes.prototype, "adminDeleteVendor", null);
exports.AdminRoutes = AdminRoutes = __decorate([
    (0, common_1.Controller)('adminRoutes'),
    __metadata("design:paramtypes", [adminController_1.adminController,
        userController_1.userController,
        vendorController_1.vendorController])
], AdminRoutes);
let UserSelfRoute = class UserSelfRoute {
    constructor(adminController, userController1) {
        this.adminController = adminController;
        this.userController1 = userController1;
    }
    async signup(SignupDto) {
        return await this.userController1.UserSignup(SignupDto);
    }
    async userLogin(UserLoginDto) {
        console.log('inside api');
        return await this.userController1.userLogin(UserLoginDto);
    }
    async userLogout(UserLogoutDto) {
        return await this.userController1.userLogout(UserLogoutDto);
    }
    async userProfileEdit(UserProfileDto) {
        return await this.userController1.EditUserProfile(UserProfileDto);
    }
    async validUser(validateUserDto) {
        console.log('inside api');
        return await this.userController1.validUser(validateUserDto);
    }
    async updatePassword(updatePassDto) {
        return await this.userController1.updatePassword(updatePassDto);
    }
    async userProfileDetails(UserProfileDto) {
        return await this.userController1.ProDetails(UserProfileDto);
    }
    async userListing(userListingDto) {
        return await this.userController1.listing(userListingDto);
    }
    async userUpdateStatus(UserProfileUpdateDto) {
        return await this.userController1.UpdateuserStatus(UserProfileUpdateDto);
    }
    async adminDeleteUser(DeleteUserDto) {
        return await this.userController1.DeleteUser(DeleteUserDto);
    }
};
exports.UserSelfRoute = UserSelfRoute;
__decorate([
    (0, common_1.Post)('userSignup'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.addSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('userLogin'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.LoginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('userLogout'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.emailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userLogout", null);
__decorate([
    (0, common_1.Post)('EditUserProfile'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userProfileEdit", null);
__decorate([
    (0, common_1.Get)('validUser'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "validUser", null);
__decorate([
    (0, common_1.Post)('updateUserPassword'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)('ProDetails'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userProfileDetails", null);
__decorate([
    (0, common_1.Get)('Listing'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.listing))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userListing", null);
__decorate([
    (0, common_1.Post)('UpdateStatus'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdateStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "userUpdateStatus", null);
__decorate([
    (0, common_1.Post)('DeleteUser'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.deleteSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserSelfRoute.prototype, "adminDeleteUser", null);
exports.UserSelfRoute = UserSelfRoute = __decorate([
    (0, common_1.Controller)('userRoute'),
    __metadata("design:paramtypes", [adminController_1.adminController,
        user_controller_1.userController1])
], UserSelfRoute);
let VendorSelfRoute = class VendorSelfRoute {
    constructor(adminController, vendorController1) {
        this.adminController = adminController;
        this.vendorController1 = vendorController1;
    }
    async signup(SignupDto) {
        return await this.vendorController1.VendorSignup(SignupDto);
    }
    async userLogin(vendorLoginDto) {
        console.log('inside api');
        return await this.vendorController1.vendorLogin(vendorLoginDto);
    }
    async userLogout(vendorLogoutDto) {
        return await this.vendorController1.vendorLogout(vendorLogoutDto);
    }
    async userProfileEdit(vendorProfileDto) {
        return await this.vendorController1.EditVendorProfile(vendorProfileDto);
    }
    async validVendor(validateVendorDto) {
        console.log('inside api');
        return await this.vendorController1.validVendor(validateVendorDto);
    }
    async updatePassword(updatePassDto) {
        return await this.vendorController1.updatePassword(updatePassDto);
    }
    async vendorProfileDetails(vendorProfileDto) {
        return await this.vendorController1.ProDetails(vendorProfileDto);
    }
    async vendorListing(vendorListingDto) {
        return await this.vendorController1.listing(vendorListingDto);
    }
    async vendorUpdateStatus(VendorProfileUpdateDto) {
        return await this.vendorController1.UpdatevendorStatus(VendorProfileUpdateDto);
    }
    async adminDeleteUser(DeleteVendorDto) {
        return await this.vendorController1.DeleteVendor(DeleteVendorDto);
    }
};
exports.VendorSelfRoute = VendorSelfRoute;
__decorate([
    (0, common_1.Post)('vendorSignup'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.addSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('vendorLogin'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.LoginSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('vendorLogout'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.emailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "userLogout", null);
__decorate([
    (0, common_1.Post)('EditVendorProfile'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "userProfileEdit", null);
__decorate([
    (0, common_1.Get)('validVendor'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "validVendor", null);
__decorate([
    (0, common_1.Post)('updateVendorPassword'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdatePassSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)('ProDetails'),
    __param(0, (0, common_1.Query)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.editProfileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "vendorProfileDetails", null);
__decorate([
    (0, common_1.Get)('VendorListing'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "vendorListing", null);
__decorate([
    (0, common_1.Post)('UpdateStatus'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.UpdateStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "vendorUpdateStatus", null);
__decorate([
    (0, common_1.Post)('DeleteVendor'),
    __param(0, (0, common_1.Body)(new validationPipe_1.JoiValidationPipe(ValidationSchema_1.deleteSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], VendorSelfRoute.prototype, "adminDeleteUser", null);
exports.VendorSelfRoute = VendorSelfRoute = __decorate([
    (0, common_1.Controller)('vendorRoute'),
    __metadata("design:paramtypes", [adminController_1.adminController,
        vendor_controller_1.vendorController1])
], VendorSelfRoute);
//# sourceMappingURL=app.routes.js.map