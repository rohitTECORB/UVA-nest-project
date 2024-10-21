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
        code: any;
        message: any;
        result?: undefined;
        session?: undefined;
    } | {
        code: any;
        message: any;
        result: {
            savedUser: any;
            pass: string;
        };
        session: any;
    } | {
        code: any;
        message: any;
        result: any;
        session?: undefined;
    }>;
    updatePassword(updatePasswordDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
        newpassword?: undefined;
    } | {
        code: any;
        message: any;
        result: import("typeorm").UpdateResult;
        newpassword: string;
    } | {
        code: any;
        message: any;
        result: any;
        newpassword?: undefined;
    }>;
    forgetPass(forgetPassDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    varifyOTP(ForgetPassDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    EditUserProfile(EditUserDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    userProfileDetails(UserProfileDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    UpdateuserStatus(UserStatusUpdateDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    userlisting(userListingDto: UserDto): Promise<{
        code: any;
        message: any;
        result: any[];
        total: number;
    } | {
        code: any;
        message: any;
        result: any;
        total?: undefined;
    }>;
    adminDeleteUser(DeleteUserDto: UserDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
}
