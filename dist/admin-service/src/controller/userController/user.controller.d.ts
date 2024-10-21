import { MethodServic } from '../../methods/methods.service';
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';
import { Vendor } from 'src/entities/vendor.entity';
export declare class userController1 {
    private readonly adminRepository;
    private readonly userRepository;
    private readonly vendorRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, userRepository: Repository<User>, vendorRepository: Repository<Vendor>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    UserSignup(SignupDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: any;
        result: {
            savedUser: any;
            pass: string;
            User_obj: any;
        };
        session: any;
    } | {
        code: number;
        message: any;
        result: any;
        session?: undefined;
    }>;
    userLogin(UserLoginDto: UserDto): Promise<{
        code: number;
        message: any;
        merssage?: undefined;
        result?: undefined;
    } | {
        code: number;
        merssage: any;
        message?: undefined;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
        merssage?: undefined;
    }>;
    userLogout(UserLogoutDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    validUser(validUserDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    updatePassword(updatePasswordDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    forgetPass(forgetPassDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    varifyOTP(ForgetPassDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    EditUserProfile(EditUserDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    ProDetails(UserProfileDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    UpdateuserStatus(UserStatusUpdateDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    listing(userListingDto: UserDto): Promise<{
        code: number;
        message: any;
        result: any[];
        total: number;
    } | {
        code: number;
        message: any;
        result?: undefined;
        total?: undefined;
    }>;
    DeleteUser(DeleteUserDto: UserDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: import("typeorm").UpdateResult;
    }>;
}
