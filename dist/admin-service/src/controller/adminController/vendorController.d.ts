import { MethodServic } from '../../methods/methods.service';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { VendorDto } from '../../dto/vendor.dto';
import { Vendor } from '../../entities/vendor.entity';
export declare class vendorController {
    private readonly vendorRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(vendorRepository: Repository<Vendor>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    addVender(SignupDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
        session?: undefined;
    } | {
        code: any;
        message: any;
        result: {
            savedVendor: any;
            pass: string;
        };
        session: any;
    } | {
        code: any;
        message: any;
        result: any;
        session?: undefined;
    }>;
    updatePassword(updatePasswordDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    forgetPass(forgetPassDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    varifyOTP(varifyVendorOTPDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    EditVendorProfile(EditVendorDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    vendorProfileDetails(vendorProfileDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    UpdatevendorStatus(VendorStatusUpdateDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
    vendorlisting(VendorListingDto: VendorDto): Promise<{
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
    adminDeleteVendor(DeleteVendorDto: VendorDto): Promise<{
        code: any;
        message: any;
        result?: undefined;
    } | {
        code: any;
        message: any;
        result: any;
    }>;
}
