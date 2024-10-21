import { adminController } from './controller/adminController/adminController';
import { userController } from './controller/adminController/userController';
import { vendorController } from './controller/adminController/vendorController';
import { UserDto } from './dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { VendorDto } from './dto/vendor.dto';
import { userController1 } from './controller/userController/user.controller';
import { vendorController1 } from './controller/vendorController/vendor.controller';
export declare class ViewRoutes {
    getUser(res: Response): void;
    getVendor(res: Response): void;
    getAdmin(res: Response): void;
    signupUser(res: Response): void;
    loginUser(res: Response): void;
}
export declare class AdminRoutes {
    private readonly adminController;
    private readonly userController;
    private readonly vendorController;
    constructor(adminController: adminController, userController: userController, vendorController: vendorController);
    signup(SignupDto: AuthDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: {
            savedAdmin: any;
            pass: string;
        };
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    login(LoginDto: AuthDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: string;
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    logout(LogoutDto: AuthDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    addNewUSer(AddNewUser: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: {
            savedUser: any;
            pass: string;
        };
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    updatePassword(UpdatePasswordDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        newpassword?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").UpdateResult;
        newpassword: string;
    } | {
        code: number;
        message: string;
        result: any;
        newpassword?: undefined;
    }>;
    forgetpassword(ForgetPassDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    varifyOTP(ForgetPassDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    EditUserProfile(EditUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userProfileDetails(UserProfileDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userUpdateStatus(UserProfileUpdateDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userListing(userListingDto: UserDto): Promise<{
        code: number;
        message: string;
        result: any[];
        total: number;
    } | {
        code: number;
        message: string;
        result: any;
        total?: undefined;
    }>;
    adminDeleteUser(DeleteUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    newVendorSignUp(VendorSignupDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: {
            savedVendor: any;
            pass: string;
        };
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    updateVendorPassword(updatePasswordDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    forgetPass(forgetPassDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    varifyVendorOTP(varifyVendorOTPDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    EditVendorProfile(editVendorprofile: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorProfileDetails(vendorProfileDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    UpdatevendorStatus(updateVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorlisting(vendorListingDto: VendorDto): Promise<{
        code: number;
        message: string;
        result: any[];
        total: number;
    } | {
        code: number;
        message: string;
        result: any;
        total?: undefined;
    }>;
    adminDeleteVendor(DeleteVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
}
export declare class UserSelfRoute {
    private readonly adminController;
    private readonly userController1;
    constructor(adminController: adminController, userController1: userController1);
    signup(SignupDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: {
            savedUser: any;
            pass: string;
            User_obj: any;
        };
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    userLogin(UserLoginDto: UserDto): Promise<{
        code: number;
        message: string;
        merssage?: undefined;
        result?: undefined;
    } | {
        code: number;
        merssage: string;
        message?: undefined;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
        merssage?: undefined;
    }>;
    userLogout(UserLogoutDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userProfileEdit(UserProfileDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    validUser(validateUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    updatePassword(updatePassDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userProfileDetails(UserProfileDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userListing(userListingDto: UserDto): Promise<{
        code: number;
        message: string;
        result: any[];
        total: number;
    } | {
        code: number;
        message: string;
        result?: undefined;
        total?: undefined;
    }>;
    userUpdateStatus(UserProfileUpdateDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    adminDeleteUser(DeleteUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
export declare class VendorSelfRoute {
    private readonly adminController;
    private readonly vendorController1;
    constructor(adminController: adminController, vendorController1: vendorController1);
    signup(SignupDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: {
            savedVendor: any;
            pass: string;
            Vendor_obj: any;
        };
        session: any;
    } | {
        code: number;
        message: string;
        result: any;
        session?: undefined;
    }>;
    userLogin(vendorLoginDto: VendorDto): Promise<{
        code: number;
        message: string;
        merssage?: undefined;
        result?: undefined;
    } | {
        code: number;
        merssage: string;
        message?: undefined;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
        merssage?: undefined;
    }>;
    userLogout(vendorLogoutDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userProfileEdit(vendorProfileDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    validVendor(validateVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    updatePassword(updatePassDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorProfileDetails(vendorProfileDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorListing(vendorListingDto: VendorDto): Promise<{
        code: number;
        message: string;
        result: any[];
        total: number;
    } | {
        code: number;
        message: string;
        result?: undefined;
        total?: undefined;
    }>;
    vendorUpdateStatus(VendorProfileUpdateDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    adminDeleteUser(DeleteVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
