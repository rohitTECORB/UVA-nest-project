import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment  from 'moment'
import { MethodServic } from '../../methods/methods.service'
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { AuthService } from '../../guards/auth.service';
import { VendorDto } from '../../dto/vendor.dto';
import { Vendor } from '../../entities/vendor.entity'
import { codes } from 'src/helpers/codes';

import { messages} from 'src/helpers/messages';






export class vendorController{

    constructor(
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(OTPGen)
        private readonly otpRepository: Repository<OTPGen>,
    
        private readonly methodsService: MethodServic,
        private readonly authService: AuthService
      ){}



      async addVender(SignupDto: VendorDto) {
        const message = messages(SignupDto.language ?? 'English');
        try {
          const { email, name, contact } = SignupDto;
   
          if (!email || !name || !contact) {
            return {
              code: codes.badRequest,
              message: message.notFound
            }
          }     
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const resultEmail = emailRegex.test(email)  
          console.log(resultEmail) 
          if (resultEmail == false) {
            return {
              code: codes.badRequest,
              message: message.somethingWrong,
            };
          }
          const existingVendor = await this.vendorRepository.findOne({ where: { email } });         
          if (existingVendor) {
            return {
              code:codes.badRequest,
              message: message.AlreadyExists
            }
          }else{

          const pass = await this.methodsService.generateRandomPassword(5)        
          var vendor_obj: any = {
            name: name,
            email: email,
            password: pass, 
            contact: contact,
            isActive: true,
            isDelete: false,
            createdAt: new Date(),
            updateAt: new Date()
          };    

          const savedVendor = await this.vendorRepository.save(vendor_obj);
     
          const token = await this.authService.generateToken();
          console.log(token)
             
          const session: any = {
            vendorId: savedVendor.id.toString(),
            type: 'vendor',
            token: token,
          };    
          const savedSession = await this.sessionRepository.save(session);     
          return {
            code: codes.success,
            message: message.success,
            result: {savedVendor, pass},
            session: savedSession,
          };
        }
        } catch (error) {
          return{
            code: codes.serverError,
            message:message.success,
            result: error.message
        }
      }
      }



      async updatePassword(updatePasswordDto:  VendorDto){
        const message = messages(updatePasswordDto.language ?? 'English');
        try{
          const {oldpassword, newpassword, email} = updatePasswordDto;    
          if(!oldpassword || !newpassword || !email){
            return {
              code: codes.badRequest,
              message: message.notFound
            }
          }         
          let check = await this.vendorRepository.findOne({where:{email}})     
          const vendor_id = check.id.toString();      
          if(!check){
            return {
              code: codes.badRequest,
              message: message.notFound
            }
          }else{
            const validatePassword = await this.methodsService.verifyPassword({'password':oldpassword, '_password': check.password})
        
            if(validatePassword == true){             
               let check = await this.vendorRepository.update(vendor_id, { password: newpassword });
               return {
                code: codes.success,
                message: message.success,
                result: check
               }
            }else{
              return {
                code:codes.badRequest,
                message: message.invalidPass
              }
            }
          }    
        }catch(error){
          return {
            code: codes.serverError,
            message:message.success,
            result: error.message
          }
        }
     }
    


     async forgetPass(forgetPassDto:  VendorDto){
      const message = messages(forgetPassDto.language ?? 'English');
      try{
        const {email} = forgetPassDto;   
        if(!email){        
          return{
            code: codes.badRequest,           
            message: message.notFound
          }         
        }else{
          const check = await this.vendorRepository.findOne({where:{email}});  
          const _id:any = check.id;             
          if(check){
            const vendor_id = _id.toString();
            const newOTP = await this.methodsService.generateOTP(4); 
                 
            const saved_OTP = {
              vendor_id,
              newOTP,
              email
            }
            const savedOTP = await this.otpRepository.save(saved_OTP)
            const send_email = await this.methodsService.sendEmail({newOTP, email})
          }else{
            return {
            code:codes.badRequest,
            message: message.notFound
          }   
        }
       }
      }catch(error){
        return {
          code: codes.serverError,
          message:message.success,
          result: error.message
        }
      }
     }



 async varifyOTP(varifyVendorOTPDto: VendorDto){
  const message = messages(varifyVendorOTPDto.language ?? 'English');
  try{
    const {email, OTP} = varifyVendorOTPDto;
   
      const check = await this.otpRepository.findOne({where:{email}});
      if(!check){
        return{
          code: codes.badRequest,
          message: message.notFound
        }
     }else{
      const otpStatus = await this.methodsService.verifyOTP({'dbOTP': check.newOTP, '_otp': OTP})
      if(otpStatus == true){
        const newcheck = await this.vendorRepository.findOne({where:{email}});
        const pass = newcheck.password;
        const send_email = await this.methodsService.sendEmail1({pass, email})
        return{
          code:codes.success,
          message: message.success,
          result: otpStatus
        }
      } else{
        return{
          code:codes.badRequest,
          message: message.BadRequest,
          result: otpStatus
        }
      }
   }     
  }catch(error){
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }
  }
 }


 async EditVendorProfile(EditVendorDto: VendorDto) {
  const message = messages(EditVendorDto.language ?? 'English');
  try {
    const data = EditVendorDto;
 
    
    const status = data.status;
    const _id: any = data.vendor_id;
    
    if (!_id   ) {
      return {
        code: codes.badRequest,
        message: message.notFound
      };
    }
    const check = await this.vendorRepository.findOne(_id);   
    if (check) {    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result1 = emailRegex.test(data.email)
      if ( data.email  && !result1) {
        return {
          code: codes.badRequest,
          message: 'Invalid email format',
          result: result1
        }
      }
      const contact = check.contact;    
      let status1: Boolean = check.isActive;
      if (status === 'Active') {
        status1 = true;
      } else if (status === 'Deactive') {
        status1 = false;
      }
      const updatedData = {
        name: data.name ? data.name : check.name,
        email: data.email ? data.email : check.email,
        contact: data.contact ? data.contact : contact,
        isActive: status1,
        updatedAt: new Date()
      };
      const savedObj = await this.vendorRepository.update(_id, updatedData); 
      return {
        code: codes.success,
        message: message.success,
        result: savedObj,
      };
    } else {
      return {
        code: codes.badRequest,
        message: message.notFound
      };
    }
  } catch (error) {
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }
  }
}



async  vendorProfileDetails(vendorProfileDto: VendorDto) {
  const message = messages(vendorProfileDto.language ?? 'English');
  try {  
    const reqData = vendorProfileDto;
    const _id:any = reqData.vendor_id;
    if (!_id) {
      return {
        code: codes.badRequest,
        message: message.notFound
      }
    }
    const check = await this.vendorRepository.findOne(_id);
  
    if (check) {
      return{
        code: codes.success,
        message: message.success,
        result: check
      }
    } else {
      return {
        
          code: codes.badRequest,
          message: message.notFound
      }
    }
  } catch (error) {
    console.error(error); 
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }
  }
}



async UpdatevendorStatus(VendorStatusUpdateDto: VendorDto){
  const message = messages(VendorStatusUpdateDto.language ?? 'English');
  try{
    const reqData = VendorStatusUpdateDto;
    const status = reqData.status;
    console.log(status)
  
    const _id:any = reqData.vendor_id;  
    console.log(_id)
   
    if(!_id){
      return{
        code:codes.badRequest,
        message: message.notFound
      }
    }else{
    const check = await this.vendorRepository.findOne(_id);
  
      if(check){
        if(status == 'Active'){
          var new_Obj ={
            'isActive': true        
            }
        }else{
          var new_Obj ={
            'isActive': false
          }
        }
        const updatedStatus =  await this.vendorRepository.update(_id, new_Obj);
        return{
          code:codes.success,
          message:message.success,
          result: updatedStatus
        }
      }else{
        return{
          code:codes.badRequest,
          message: message.notFound
        }
      }
    }
  }catch(error){
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }

  }
}


async vendorlisting(VendorListingDto: VendorDto){
  const message = messages(VendorListingDto.language ?? 'English');
  try {
      const data = VendorListingDto;

      const page:any = data.pageNo || 1;
      const page1 = parseInt(page, 10); 
     
      const perPage:any = data.perPage || 10;
      const perPage1 = parseInt(perPage, 10); 

      let obj_data: any = { 'isDelete': false };

      if (data.search && data.search.trim() !== '' && data.toDate && data.fromDate) {
          obj_data = {
              $or: [
                  { name: { '$regex': data.search, '$options': 'i' } },
                  { email: { '$regex': data.search, '$options': 'i' } },
                  { contact: { '$regex': data.search, '$options': 'i' } }
              ],
              isDelete: false,
              createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },              
          };  
      } else if (data.search && data.search!== '') {
          obj_data = {
              $or: [
                  { name: { '$regex': data.search, '$options': 'i' } },
                  { email: { '$regex': data.search, '$options': 'i' } },
                  { contact: { '$regex': data.search, '$options': 'i' } }
              ],
              isDelete: false,
          };
      } else if (data.fromDate && data.toDate) {
          obj_data = {
              createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
              isDelete: false
          };
      }  

      const total: number = await this.vendorRepository.count(obj_data);
     

      const usrData = await this.vendorRepository.find({
        where: obj_data,
        order: {
          createdAt: 'DESC',
        }, 
        skip: (page1 - 1) * perPage1, 
        take: perPage1,               
      });    
      
      const length: number = usrData.length;
     
      var newObj_data = [];
      var obj_data1 = {};  
      var status1;
      for(let i = 0; i < length; i++){       
          var objectId = usrData[i].id;
          var id =  objectId.toString()
          obj_data1={
          name: usrData[i].name,
          email: usrData[i].email,
          contact: usrData[i].contact, 
          vendor_id: id,
          status:usrData[i].isActive,
          createdAt: moment(usrData[i].createdAt).format('YYYY/MM/DD'),
      }
          newObj_data.push(obj_data1)
      }
    
      return {
        code: codes.success,
        message: message.success,
        result: newObj_data, total      
      }   
  } catch (error) {
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }
  }
}

async adminDeleteVendor(DeleteVendorDto:VendorDto){ 
  const message = messages(DeleteVendorDto.language ?? 'English');
  try{
    const data = DeleteVendorDto;
  
    const id:any = data.vendor_id;
    console.log(id)
    const chck = await this.vendorRepository.findOne(id);

    if(!chck){
      return{
        code: codes.badRequest,
        message: message.notFound
      }
    }else{
      const vendorDeleted = await this.vendorRepository.update(id,{isDelete:true})
      return   {
        code: codes.success,
        message: message.success,
        result: vendorDeleted
      }   
    }
  }catch(error){
    return {
      code: codes.serverError,
      message:message.success,
      result: error.message
    }
  }
}





}