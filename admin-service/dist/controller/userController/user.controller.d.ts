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
    validUser(validUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    updatePassword(updatePasswordDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    forgetPass(forgetPassDto: UserDto): Promise<{
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
    ProDetails(UserProfileDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    UpdateuserStatus(UserStatusUpdateDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    listing(userListingDto: UserDto): Promise<{
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
    DeleteUser(DeleteUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
