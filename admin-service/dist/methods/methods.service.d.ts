import { MailerService } from '@nestjs-modules/mailer';
export declare class MethodServic {
    private readonly mailService;
    constructor(mailService: MailerService);
    generateRandomPassword(length: any): Promise<string>;
    hashpass(password: any): Promise<any>;
    verifyPassword(obj: any): Promise<any>;
    password_auth(password: string): Promise<any>;
    generateOTP(length: number): Promise<number>;
    verifyOTP(obj: any): Promise<boolean>;
    sendEmail(obj: any): Promise<void>;
    sendEmail1(obj: any): Promise<void>;
}
