import { MethodServic } from '../../methods/methods.service';
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { Vendor } from 'src/entities/vendor.entity';
import { VendorDto } from 'src/dto/vendor.dto';
export declare class vendorController1 {
    private readonly adminRepository;
    private readonly vendorRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, vendorRepository: Repository<Vendor>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    VendorSignup(SignupDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: any;
        result: {
            savedVendor: any;
            pass: string;
            Vendor_obj: any;
        };
        session: any;
    } | {
        code: number;
        message: any;
        result: any;
        session?: undefined;
    }>;
    vendorLogin(vendorLoginDto: VendorDto): Promise<{
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
    vendorLogout(vendorLogoutDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    validVendor(validVendorDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    updatePassword(updatePasswordDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    forgetPass(forgetPassDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    varifyOTP(ForgetPassDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    EditVendorProfile(EditVendorDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    ProDetails(VendorProfileDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: Vendor;
    }>;
    UpdatevendorStatus(VendorStatusUpdateDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: any;
    }>;
    listing(vendorListingDto: VendorDto): Promise<{
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
    DeleteVendor(DeleteVendorDto: VendorDto): Promise<{
        code: number;
        message: any;
        result?: undefined;
    } | {
        code: number;
        message: any;
        result: import("typeorm").UpdateResult;
    }>;
}
