import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment  from 'moment'

import { MethodServic } from '../../methods/methods.service'
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { AuthService } from '../../guards/auth.service';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';
import { Vendor } from 'src/entities/vendor.entity';

import { codes } from '../../helpers/codes'
import { messages } from 'src/helpers/messages';


@Injectable()
export class userController1{

    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(OTPGen)
        private readonly otpRepository: Repository<OTPGen>,
        private readonly methodsService: MethodServic,
        private readonly authService: AuthService
      ){}



  async UserSignup(SignupDto: UserDto) {
    const message = messages(SignupDto.language ?? 'English');
        try {  
          const email = SignupDto.email.toLowerCase();
          const { name, contact } = SignupDto;  
          if (!email || !name || !contact) {
            return {
              code: codes.badRequest,
              message: message.notFound
            };
          }  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const resultEmail = emailRegex.test(email)   
          if (resultEmail == false) {
            return {
              code: codes.badRequest,
              message: message.somethingWrong,
            };
          }
          const existingUser = await this.userRepository.findOne({ where: { email } });         
          if (existingUser) {
            return {
              code:codes.badRequest,
              message: message.AlreadyExists
            }
          }else{
            const check_user = await this.userRepository.findOne({ where: { email } });
            console.log(check_user);
            const token = await this.authService.generateToken();
            console.log(token);
            const pass = await this.methodsService.generateRandomPassword(5)
            const Send_email = await this.methodsService.sendEmail({'email':email, 'newOTP':pass})   
            console.log(Send_email);
            const newPass = await this.methodsService.hashpass(pass)  
            console.log(newPass);
            if(!check_user){

           var User_obj: any = {
            name: name,
            email: email,
            password: newPass, 
            contact: contact,
            isActive: true,
            isDelete: false,
            createdAt: new Date(),
            updateAt: new Date()
          };    
          const savedUser = await this.userRepository.save(User_obj);  
          const session: any = {
            userId: savedUser.id.toString(),
            type: 'user',
            token: token,
          };    
          const savedSession = await this.sessionRepository.save(session);     
          console.log(savedSession)
          return {
            code: codes.success,
            message: message.success,
            result: {savedUser, pass, User_obj},
            session: savedSession,
          };
        }else{
            var id:any = check_user.id.toString()
            console.log(id)
            var session = await this.sessionRepository.findOne({where:{userId:id}})
            if(session && session.token){
                var tokenData = session.token;
            }else{
                var sessionToken:any = {
                    userId: check_user.id.toString(),
                    type:'user',
                    token: token,
                }
                var savedSession = await this.sessionRepository.save(sessionToken);
                var tokenData = token;
            }
            var userDetails = {
                '_id': check_user.id.toString(),
                'name':check_user.name,
                'email':check_user.email,
                'language':check_user.language,
                'role':check_user.role,
                'isActive': check_user.isActive,
                'token':tokenData
            }
            return {
                code:codes.success,
                message: message.success,
                result: userDetails
            }
          }
        }
     } catch (error) {
          console.log('Error during vendor signup:', error);
          return{
            code: codes.serverError,
            message:message.success,
            result: error.message
        }
        }
      }
      
      

      async userLogin(UserLoginDto: UserDto){
        const message = messages(UserLoginDto.language ?? 'English');
        try{
            const email = UserLoginDto.email.toLowerCase();
            console.log(email)
            const password = UserLoginDto.password;
            console.log(password)
        
            if(!email || !password){
                return{
                    code:codes.badRequest,
                    message: message.notFound
                }
            }
            const user = await this.userRepository.findOne({where:{email}});
            if(user && user.password){
              const id:any = user.id.toString()
             
              console.log(id)
              const password_status = await this.methodsService.verifyPassword({'plainPassword': password, 'hashedPassword': user.password});
            if(password_status == false){
                return{
                    code:codes.badRequest,
                    message: message.invalidPass
                }
            }else{
                var token = await this.authService.generateToken();
                const checkSession = await this.sessionRepository.delete({ userId: id });
                var sessionToken:any = {
                  'userId': user.id.toString(),
                  'token': token,
                  'type': 'user'
                }
                const savedSessionToken = await this.sessionRepository.save(sessionToken);
                var userDetails = {
                  '_id':user.id.toString(),
                  'email':user.email,
                  'name':user.name,
                  'language': user.language,
                  'isActive': user.isActive,
                  'token': token
                }
                return {
                  code:codes.success,
                  message: message.success,
                  result: userDetails
                } 
            }  
          }else{
            return{
              code:codes.badRequest,
              merssage:message.notFound
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
   


      async userLogout(UserLogoutDto:UserDto){
        const message = messages(UserLogoutDto.language ?? 'English');
        try{
          console.log("Rohit testing")
          const id = UserLogoutDto.user_id;
          console.log(id);
          if(!id){
            return{
              code:codes.badRequest,
              message: message.notFound
            }
          }else{
            const update =  await this.sessionRepository.delete({ userId: id });
            console.log(update)
            if(update){
              return{
                code:codes.success,
                message: message.success
              }
            }else{
              return{
                code:codes.badRequest,
                message: message.notFound
              }
            }
          }         
        }catch(error){
          return{
            code: codes.serverError,
            message:message.success,
            result: error.message
          }

        }

      }

     
//  async userEditProfile(UserProfileDto: UserDto) {
//     try { 
//       const reqData = UserProfileDto;
//       const email = reqData.email
//       console.log(email)
//       if (!email) {
//         return {
//           code: codes.badRequest,
//           message:'Bad Request: User id does not exist'
//         }
//       }else{
//       const user = await this.userRepository.findOne({where:{email}});
//       console.log(user)
//       const id = user.id;
//       console.log(id)
//       if (user) {
//         const updatedUser = {
//              name: reqData.name || user.name,
//              contact: reqData.contact || user.contact,
//              language: reqData.language || user.language,         
//              };
//         if (reqData.contact && reqData.contact !== user.contact) {
//           updatedUser.contact = reqData.contact;
//         }
//         const updated = await this.userRepository.update(id, updatedUser);
//           return {
//             code:200,
//             message:'Profile updated successfully',
//             result: updated
//           }
//       }else{
//         return {
//           code:codes.badRequest,
//           message:'Bad Request'
//         }
//       }
//     }
//     }catch (error) {
//       console.error(error);
//       return {
//         code:500,
//         message: "Internal Server Error"
//       }
//     }  
//   }

  

 async validUser(validUserDto: UserDto){
  const message = messages(validUserDto.language ?? 'English');
    try {
      const { type, email, contact } = validUserDto
     
      if (!type || !email || !contact) {
        return {
          code: codes.badRequest,
          message:message.notFound
        }
      }
      if (type === 'user') {   
        const user = await this.userRepository.findOne({where:{email}});
        if (user) {
          return {
            code:codes.success,
            message: message.success
          }
        } else {
          return {
            code:codes.badRequest,
            message:message.notFound
          }
        }
      } else if (type === 'vendor') {      
        const vendor = await this.vendorRepository.findOne({ where: { contact } });
        if (vendor) {
          return {
            code:codes.success,
            message: message.success
          }
        } else {
          return  {
            code:codes.badRequest,
            message:message.notFound
          }
        }
      } else {
        return  {
          code:codes.badRequest,
          message: message.BadRequest
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


   async updatePassword(updatePasswordDto:  UserDto){
    const message = messages(updatePasswordDto.language ?? 'English');
    try{
      const {oldpassword, newpassword, email} = updatePasswordDto;
      console.log(oldpassword)
      console.log(newpassword)
      console.log(email)
      if(!oldpassword || !newpassword || !email){
        return {
          code: codes.badRequest,
          message: message.notFound
        }
      }
      
      let check = await this.userRepository.findOne({where:{email}})
      console.log(check)
      console.log(check.password)
      const user_id = check.id.toString();
      console.log(user_id)
      if(!check){
        return {
          code: codes.badRequest,
          message: message.notFound
        }
      }else{
        const validatePassword = await this.methodsService.verifyPassword({'plainPassword':oldpassword, 'hashedPassword': check.password})
        console.log(validatePassword)
        if(validatePassword == true){
          const newPass = await this.methodsService.hashpass(newpassword)  
           let check = await this.userRepository.update(user_id, { password: newPass });
           return {
            code: codes.success,
            message: message.success,
            result: check
           }
        }else{
          return {
            code:codes.badRequest,
            message: message.BadRequest
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


async forgetPass(forgetPassDto:  UserDto){
  const message = messages(forgetPassDto.language ?? 'English');
  try{
    const {email} = forgetPassDto;
    console.log(email)
    if(!email){
      return{
        code: codes.badRequest,
        message: message.notFound
      }
    }else{
      const check = await this.userRepository.findOne({where:{email}});
      
      if(check){
        const user_id = check.id.toString()
        const newOTP = await this.methodsService.generateOTP(4)
       
        const saved_OTP = {
          user_id,
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



async varifyOTP(ForgetPassDto: UserDto){
  const message = messages(ForgetPassDto.language ?? 'English');
  try{
    const {email, OTP} = ForgetPassDto;
    console.log(email)
    console.log(OTP)
      const check = await this.otpRepository.findOne({where:{email}});
      if(!check){
        return{
          code: codes.badRequest,
          message: message.notFound
        }
     }else{
      const otpStatus = await this.methodsService.verifyOTP({'dbOTP': check.newOTP, '_otp': OTP})
      if(otpStatus == true){
        const newcheck = await this.userRepository.findOne({where:{email}});
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
          message:message.BadRequest,
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



 async EditUserProfile(EditUserDto: UserDto) {
  const message = messages(EditUserDto.language ?? 'English');
  try {
    const data = EditUserDto;
    console.log(data.email);
    
    const status = data.status;
    const _id: any = data.user_id;
    
    if (!_id   ) {
      return {
        code: codes.badRequest,
        message: message.notFound
      };
    }
    const check = await this.userRepository.findOne(_id);   
    if (check) {    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result1 = emailRegex.test(data.email)
      if ( result1 == false) {
        return {
          code: codes.badRequest,
          message: message.notFound,
          result: result1
        }
      }
      const contact = check.contact;     
      let status1: Boolean = check.isActive;
      if (status === 'Active') {
        status1 = true;
      } else if (status === 'Inactive') {
        status1 = false;
      }

      const updatedData = {
        name: data.name ? data.name : check.name,
        email: data.email ? data.email : check.email,
        contact: data.contact ? data.contact : contact,
        isActive: status1,
        updatedAt: new Date()
      };

      const savedObj = await this.userRepository.update(_id, updatedData);
      
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



async  ProDetails(UserProfileDto: UserDto) {
  const message = messages(UserProfileDto.language ?? 'English');
  try {
  
    const reqData = UserProfileDto;
    const _id:any = reqData.user_id;
    console.log(_id)
    if (!_id) {
      return {
        code: codes.badRequest,
        message: message.notFound
      }
    }
    const check = await this.userRepository.findOne(_id);
    console.log(check)
    if (!check) {
      return{
        code: codes.badRequest,
        message: message.notFound   
      }
    } else {
     return {
      code:codes.success,
      message: message.success,
      result: check
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


async UpdateuserStatus(UserStatusUpdateDto: UserDto){
  const message = messages(UserStatusUpdateDto.language ?? 'English');
  try{
    const reqData = UserStatusUpdateDto;
    const status = reqData.status;
    console.log(status)
    const _id:any = reqData.user_id;  
    console.log(_id)
    if(!_id){
      return{
        code:codes.badRequest,
        message: message.notFound
      }
    }else{
    const check = await this.userRepository.findOne(_id);
    console.log(check)
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
        const updatedStatus =  await this.userRepository.update(_id, new_Obj);
        return{
          code:codes.success,
          message:message.success,
          result: updatedStatus
        }
      }else{
        return{
          code:codes.badRequest,
          message: message.notFound,
        }
      }
    }
  }catch(error){
    return{
      code: codes.serverError,
      message: message.serverError,
      result: error.message
    }

  }
}

 
  async listing(userListingDto: UserDto){
    const message = messages(userListingDto.language ?? 'English');
      try {
          const data = userListingDto;
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
          const total: number = await this.userRepository.count(obj_data);
       
          const usrData = await this.userRepository.find({
            where: obj_data,
            order: {
              createdAt: 'DESC',
            }, 
            skip: (page1 - 1) * perPage1, 
            take: perPage1,               
          });
          const length: number = usrData.length;
          console.log(length);
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
              user_id: id,
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
          console.error('Error occurred:', error);
          return {
              code: codes.serverError,
              message: message.serverError
          }
      }
  }



  async DeleteUser(DeleteUserDto:UserDto){ 
    const message = messages(DeleteUserDto.language ?? 'English');
    try{
      const data = DeleteUserDto;   
      const id:any = data.user_id;
      console.log(id)
      const chck = await this.userRepository.findOne(id); 
      if(!chck){
        return{
          code: codes.badRequest,
          message: message.notFound
        }
      }else{
        const userDeleted = await this.userRepository.update(id,{isDelete:true})
        return   {
          code: codes.success,
          message: message.success,
          result: userDeleted
        }   
      }
    }catch(error){
       return {
              code: codes.serverError,
              message: message.serverError
          }
    }
  }


}