
import * as bcrypt  from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import * as speakeasy  from 'speakeasy';
import * as nodemailer from 'nodemailer'; 
import createTransport from 'nodemailer'
import { otpGenerator } from 'otp-generator';
import { MailerService } from '@nestjs-modules/mailer';
import { MailtrapTransport } from 'mailtrap';
import * as crypto from 'crypto'
import { randomBytes } from 'crypto';







@Injectable()
export class MethodServic{
  constructor(private readonly mailService: MailerService) {}

  
    // async authToken () {
    //     var token = await crypto.randomBytes(48).toString('hex');
    //     console.log(token)
    //     return token;
    // };

    async generateRandomPassword(length) {
      const pass = randomBytes(length).toString('hex').slice(0, length);
      console.log(pass)
      return pass;
    }


    async hashpass(password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }

    async verifyPassword(obj) {
      console.log('compair pass')
      const plainPassword = obj.plainPassword;
      console.log(plainPassword)
      const hashedPassword = obj.hashedPassword
      console.log(hashedPassword)
      var result = await bcrypt.compare(plainPassword, hashedPassword);  
      console.log(result)
      return result
    } 
       
   async password_auth(password: string) {
       console.log('inside api')
       const hashPassword =  bcrypt.hashSync(password, 10);
       return hashPassword;
    }





    
   
 async generateOTP(length: number): Promise<number> {
    // console.log('inside api')
    //       const otp = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1)));
    //       console.log('Generated OTP: ', otp);
    //       return otp;

    const secret = speakeasy.generateSecret({length:20});
    const otp = speakeasy.totp({
      secret : secret.base32,
      encoding: 'base32'
      })
      console.log(otp)
      

      return otp;
  }

  async verifyOTP(obj){
    const dbOTP = obj.dbOTP;
    const _otp = obj._otp
    if(dbOTP == _otp){
      return true;
    }else{
      return false;
    }
  }

 
    async  sendEmail(obj) {

      const email = obj.email;
      console.log(email)
      const otp = obj.newOTP;
      console.log(otp)
  
      const transport = nodemailer.createTransport({
        service :"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user:"rhtkumar700@gmail.com",
        pass:"yfrb fosp xgsv wdvg",
         }
      });
      
      
      const mailOptions = {
        from: 'rhtkumar700@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Password is ${otp}`,
      };
  
      try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }


    async  sendEmail1(obj) {

      const email = obj.email;
      console.log(email)
      const otp = obj.pass;
      console.log(otp)
   
     
      
      const transport = nodemailer.createTransport({
        service :"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user:"rhtkumar700@gmail.com",
        pass:"yfrb fosp xgsv wdvg",
         }
      });
      
      
      const mailOptions = {
        from: 'rhtkumar700@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your password is ${otp}`,
      };
  
      try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }
   
  
}








