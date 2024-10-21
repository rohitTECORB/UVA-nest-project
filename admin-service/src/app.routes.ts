import { Controller, Post, Body, Delete, Patch , Get, Res, ParseIntPipe, Param, Query, UseGuards} from '@nestjs/common';
import { adminController } from './controller/adminController/adminController';
import { userController } from './controller/adminController/userController';
import { vendorController } from './controller/adminController/vendorController';
import { UserDto } from './dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { query, Response } from 'express';
import { join } from 'path';
import { VendorDto } from './dto/vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { userController1 } from './controller/userController/user.controller';
import { vendorController1 } from './controller/vendorController/vendor.controller'
import { JoiValidationPipe } from './helpers/validationPipe'
import { LoginSchema, UpdatePassSchema, emailSchema, varifyPassSchema, editProfileSchema, UpdateStatus, listing, deleteSchema, addSchema } from './helpers/ValidationSchema';






@Controller('static')
export class ViewRoutes {


  @Get('user')
  getUser(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'views', 'user.html'));
  }

  @Get('vendor')
  getVendor(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'views', 'vendor.html'));
  }

  @Get('admin')
  getAdmin(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'views', 'admin.html'));
  }

  @Get('signup')
  signupUser(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'views', 'signup.html'));
  }

  @Get('login')
  loginUser(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'views', 'login.html'));
  }
}


// ----------------------------------------------------------


@Controller('adminRoutes')
export class AdminRoutes {
  constructor(private readonly  adminController: adminController,
  private readonly userController: userController,
  private readonly vendorController: vendorController
 ){}

  //Auth Routes
  @Post ('signup')
  async signup(@Body(new JoiValidationPipe(addSchema)) SignupDto:AuthDto){
    console.log('inide api')
    return await this.adminController.adminSignup(SignupDto);
  }

  @Post ('login')
  async login(@Body(new JoiValidationPipe(LoginSchema)) LoginDto: AuthDto){
    return await this.adminController.login(LoginDto);
  }

  @Post ('logout')
  async logout(@Body(new JoiValidationPipe(emailSchema)) LogoutDto: AuthDto){
    return await this.adminController.logout(LogoutDto);
  }

  @Post('addUser')
  async addNewUSer(@Body(new JoiValidationPipe(addSchema)) AddNewUser:UserDto){
    return await this.userController.addUser(AddNewUser)
  }

  @Patch('updatePassword')
  async updatePassword(@Body(new JoiValidationPipe(UpdatePassSchema)) UpdatePasswordDto:UserDto){
    return await this.userController.updatePassword(UpdatePasswordDto)
  }

  @Post('forgetpassUser')
  async forgetpassword(@Body(new JoiValidationPipe(emailSchema)) ForgetPassDto: UserDto){
    return await this.userController.forgetPass(ForgetPassDto)
  }

  @Get('varifyUserOTP')
  async varifyOTP(@Body(new JoiValidationPipe(varifyPassSchema)) ForgetPassDto: UserDto ){
    return await this.userController.varifyOTP(ForgetPassDto)
  }

  @Post('EditUserProfile')
  async EditUserProfile(@Body(new JoiValidationPipe(editProfileSchema)) EditUserDto:UserDto){
    return await this.userController.EditUserProfile(EditUserDto)
  }

  @Get('userProfileDetails')
  async userProfileDetails(@Query(new JoiValidationPipe(editProfileSchema)) UserProfileDto:UserDto){
    return await this.userController.userProfileDetails(UserProfileDto)
  }

  @Post('userUpdateStatus')
  async userUpdateStatus(@Body(new JoiValidationPipe(UpdateStatus)) UserProfileUpdateDto:UserDto){
    return await this.userController.UpdateuserStatus(UserProfileUpdateDto)
  }
 
  //check this api and Joi middleware
  @Get('userListing')
  async userListing (@Query(new JoiValidationPipe(listing)) userListingDto: UserDto){
    return await this.userController.userlisting(userListingDto)
  }

  @Post('adminDeleteUser')
  async adminDeleteUser (@Body(new JoiValidationPipe(deleteSchema)) DeleteUserDto:UserDto){
    return await this.userController.adminDeleteUser(DeleteUserDto)
  }

  // Vendor Routes
   @Post('addVender')
   async newVendorSignUp(@Body(new JoiValidationPipe(addSchema)) VendorSignupDto:VendorDto){
    return await this.vendorController.addVender(VendorSignupDto)
   }


   @Post('updateVendorPass')
   async updateVendorPassword(@Body(new JoiValidationPipe(UpdatePassSchema)) updatePasswordDto:VendorDto){
     return await this.vendorController.updatePassword(updatePasswordDto)
   }

   @Post('forgetPassVendor')
   async forgetPass(@Body(new JoiValidationPipe(emailSchema)) forgetPassDto:VendorDto){
     return await this.vendorController.forgetPass(forgetPassDto)
   }

   @Post('varifyVendorOTP')
   async varifyVendorOTP(@Body(new JoiValidationPipe(varifyPassSchema)) varifyVendorOTPDto: VendorDto){
    return await this.vendorController.varifyOTP(varifyVendorOTPDto)
   }


   @Post('EditVendorProfile')
   async EditVendorProfile(@Body(new JoiValidationPipe(editProfileSchema)) editVendorprofile: VendorDto){
    return await this.vendorController.EditVendorProfile(editVendorprofile)
   }


   @Get('vendorProfileDetails')
   async vendorProfileDetails(@Query(new JoiValidationPipe(editProfileSchema)) vendorProfileDto: VendorDto){
    console.log('enter controller')
    return await this.vendorController.vendorProfileDetails(vendorProfileDto)
   }


   @Post ('UpdateVendorStatus')
   async UpdatevendorStatus(@Body(new JoiValidationPipe(UpdateStatus)) updateVendorDto: VendorDto){
    return await this.vendorController.UpdatevendorStatus(updateVendorDto);
   }


   @Get('vendorlisting')
   async vendorlisting(@Query(new JoiValidationPipe(listing)) vendorListingDto: VendorDto){
    return await this.vendorController.vendorlisting(vendorListingDto)
   }

   
  @Post('adminDeleteVendor')
  async adminDeleteVendor (@Body(new JoiValidationPipe(deleteSchema)) DeleteVendorDto:VendorDto){
    return await this.vendorController.adminDeleteVendor(DeleteVendorDto)
  }
}



// ---------------------------------------------------------------------------------



@Controller('userRoute')
export class UserSelfRoute{
  constructor(private readonly  adminController: adminController,
    private readonly userController1: userController1,
   ){}
  


  @Post ('userSignup')
  async signup(@Body(new JoiValidationPipe(addSchema)) SignupDto:UserDto){
    return await this.userController1.UserSignup(SignupDto)
  }

  @Post ('userLogin')
  async userLogin(@Body(new JoiValidationPipe(LoginSchema)) UserLoginDto:UserDto){
    console.log('inside api')
    return await this.userController1.userLogin(UserLoginDto)
  }
 
  @Post('userLogout')
  async userLogout(@Body(new JoiValidationPipe(emailSchema)) UserLogoutDto: UserDto){
    return await this.userController1.userLogout(UserLogoutDto)
  }

  @Post('EditUserProfile')
  async userProfileEdit(@Body(new JoiValidationPipe(editProfileSchema)) UserProfileDto: UserDto){
   return await this.userController1.EditUserProfile(UserProfileDto)
  }

  @Get('validUser')
  async validUser(@Body(new JoiValidationPipe(UpdatePassSchema)) validateUserDto: UserDto){
    console.log('inside api')
    return await this.userController1.validUser(validateUserDto)
  }

  @Post('updateUserPassword')
  async updatePassword(@Body(new JoiValidationPipe(UpdatePassSchema)) updatePassDto:UserDto){
    return await this.userController1.updatePassword(updatePassDto)
  }

  @Get('ProDetails')
  async userProfileDetails(@Query(new JoiValidationPipe(editProfileSchema)) UserProfileDto:UserDto){
    return await this.userController1.ProDetails(UserProfileDto)
  }

  @Get('Listing')
  async userListing (@Query(new JoiValidationPipe(listing)) userListingDto: UserDto){
    return await this.userController1.listing(userListingDto)
  }


  @Post('UpdateStatus')
  async userUpdateStatus(@Body(new JoiValidationPipe(UpdateStatus)) UserProfileUpdateDto:UserDto){
    return await this.userController1.UpdateuserStatus(UserProfileUpdateDto)
  }

  @Post('DeleteUser')
  async adminDeleteUser (@Body(new JoiValidationPipe(deleteSchema)) DeleteUserDto:UserDto){
    return await this.userController1.DeleteUser(DeleteUserDto)
  }

}


//--------------------------------------------------------------------------------------------
  

  @Controller('vendorRoute')
  export class VendorSelfRoute{
  constructor(
    private readonly  adminController: adminController,
    private readonly vendorController1: vendorController1,
   ){}
  


  @Post ('vendorSignup')
  async signup(@Body(new JoiValidationPipe(addSchema)) SignupDto:VendorDto){
    return await this.vendorController1.VendorSignup(SignupDto)
  }

  @Post ('vendorLogin')
  async userLogin(@Body(new JoiValidationPipe(LoginSchema)) vendorLoginDto:VendorDto){
    console.log('inside api')
    return await this.vendorController1.vendorLogin(vendorLoginDto)
  }
 
  @Post('vendorLogout')
  async userLogout(@Body(new JoiValidationPipe(emailSchema)) vendorLogoutDto: VendorDto){
    return await this.vendorController1.vendorLogout(vendorLogoutDto)
  }

  @Post('EditVendorProfile')
  async userProfileEdit(@Body(new JoiValidationPipe(editProfileSchema)) vendorProfileDto: VendorDto){
   return await this.vendorController1.EditVendorProfile(vendorProfileDto)
  }

  @Get('validVendor')
  async validVendor(@Body(new JoiValidationPipe(UpdatePassSchema)) validateVendorDto: VendorDto){
    console.log('inside api')
    return await this.vendorController1.validVendor(validateVendorDto)
  }

  @Post('updateVendorPassword')
  async updatePassword(@Body(new JoiValidationPipe(UpdatePassSchema)) updatePassDto:VendorDto){
    return await this.vendorController1.updatePassword(updatePassDto)
  }

  @Get('ProDetails')
  async vendorProfileDetails(@Query(new JoiValidationPipe(editProfileSchema)) vendorProfileDto:VendorDto){
    return await this.vendorController1.ProDetails(vendorProfileDto)
  }

  @Get('VendorListing')
  async vendorListing (@Query() vendorListingDto: VendorDto){
    return await this.vendorController1.listing(vendorListingDto)
  }


  @Post('UpdateStatus')
  async vendorUpdateStatus(@Body(new JoiValidationPipe(UpdateStatus)) VendorProfileUpdateDto:VendorDto){
    return await this.vendorController1.UpdatevendorStatus(VendorProfileUpdateDto)
  }

  @Post('DeleteVendor')
  async adminDeleteUser (@Body(new JoiValidationPipe(deleteSchema)) DeleteVendorDto:VendorDto){
    return await this.vendorController1.DeleteVendor(DeleteVendorDto)
  }

}











