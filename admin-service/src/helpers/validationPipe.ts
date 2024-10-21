import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import {codes} from '../helpers/codes';
import {messages} from '../helpers/messages'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any) {
    
    
    const {error}  = this.schema.validate(value);
   
    if (error) {
     return {
      code: codes.validationFailed,
      message:'Validation failed'
     }
    }
    else{
      return value;
    }
    
  }
}
