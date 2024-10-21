import { MethodServic } from '../../methods/methods.service';
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';
export declare class userController {
    private readonly adminRepository;
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, userRepository: Repository<User>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    addUser(SignupDto: UserDto): Promise<{
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
    updatePassword(updatePasswordDto: UserDto): Promise<{
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
    userProfileDetails(UserProfileDto: UserDto): Promise<{
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
    userlisting(userListingDto: UserDto): Promise<{
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
}
