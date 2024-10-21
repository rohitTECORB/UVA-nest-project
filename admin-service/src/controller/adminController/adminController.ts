import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entitiy';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { MethodServic } from '../../methods/methods.service'
import { AuthService} from '../../guards/auth.service'
import { AuthDto } from '../../dto/auth.dto';
import { codes } from '../../helpers/codes'
import { messages } from 'src/helpers/messages';



@Injectable()
export class adminController {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(OTPGen)
    private readonly otpRepository: Repository<OTPGen>,

    private readonly methodsService: MethodServic,
    private readonly authService: AuthService
  ){}


  async adminSignup(SignupDto: AuthDto) {
    const message = messages(SignupDto.language ?? 'English');
    try {
      const { email, name, contact } = SignupDto;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const resultEmail = emailRegex.test(email); 
      console.log(resultEmail) 
      if (resultEmail == false) {
        return {
          code: codes.badRequest,
          message: message.somethingWrong,
        };
      }
      const existingVendor = await this.adminRepository.findOne({ where: { email } });         
      if (existingVendor) {
        return {
          code:codes.badRequest,
          message: message.AlreadyExists
        }
      }else{
        const check_admin = await this.adminRepository.findOne({ where: { email } });
        console.log(check_admin);
        const token = await this.authService.generateToken();
        console.log(token);
        const pass = await this.methodsService.generateRandomPassword(5)
        const Send_email = await this.methodsService.sendEmail({'email':email, 'newOTP':pass})   
        console.log(Send_email);
        const newPass = await this.methodsService.hashpass(pass)  
        console.log(newPass);

      if(!check_admin){     
      var admin_obj: any = {
        name: name,
        email: email,
        password: newPass, 
        contact: contact,
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updateAt: new Date()
      };    

      const savedAdmin = await this.adminRepository.save(admin_obj);
 
      const session: any = {
        vendorId: savedAdmin.id.toString(),
        type: '',
        token: token,
      };    
      const savedSession = await this.sessionRepository.save(session);     
      return {
        code: codes.success,
        message: message.success,
        result: {savedAdmin, pass},
        session: savedSession,
      };
    }
  }
    } catch (error) {
      return{
        code: codes.serverError,
        message:message.success,
        result: error.message
    }
  }
}



  async login(LoginDto: AuthDto){
    const message = messages(LoginDto.language ?? 'English');
    try{     
      const {password, email} =  LoginDto;    
      const check:any = await this.adminRepository.findOne({where:{email}});
     
      if(!check){
        return {
          code:  codes.badRequest,
          message: message.notFound
        }
      }else{
        let passwordStatus = await this.methodsService.verifyPassword({'plainPassword': password, 'hashedPassword': check.password});
      
        if(passwordStatus == false){
         return{
          code:  codes.badRequest,
          message: message.BadRequest
         }
        }else{   
          const check_id = check.id.toString()    
          let token = await this.authService.generateToken()
          console.log(token)
          
          let dlt_session = await this.sessionRepository.delete({userId:check_id});
         
          let obj:any = {
            'adminId': check_id,
            'tokens': token,
            'type': 'admin',
            'timeStamp': Date.now()
          }
        
          let save_session = await this.sessionRepository.save(obj);

          return{
            code: codes.success,
            message: message.success,
            result: token,
            session: save_session
          }
      } 
    }
  }catch(error){
    console.log(error);
    return {
      code: codes.serverError,
      message:message.serverError,
      result: error.message
    }
  }
}



  async logout(LogoutDto: AuthDto){
    const message = messages(LogoutDto.language ?? 'English')
    try{
        const { email } = LogoutDto;
        console.log(email)
        const check = await this.adminRepository.findOne({where:{email}})
        console.log(check)
        if(check){
        const check_id = check.id.toString();
        console.log(check_id)
        var deletedUser = await this.sessionRepository.delete({adminId:check_id})
        console.log(deletedUser)
        return {
          code:codes.success,
          message:message.success,
          result:deletedUser
        }     
      }else{
        return {
          code: codes.badRequest,
          message: message.notFound
        }
      }
  
  }catch(error){
    console.log(error)
    return{
      code: codes.serverError,
      message:message.serverError,
      result: error.message
    }

  }
}

}

