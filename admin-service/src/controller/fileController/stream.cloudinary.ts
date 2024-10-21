import { Controller, Put, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { CloudinaryService } from '../../filehandling/cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Put('uploadFile')
  
  @UseInterceptors(FileInterceptor('File')) 
  async uploadFile(@UploadedFile() File,
  @Body('Quality') Quality: string) {
  console.log(File.name)
    if (!File) {
      return {
        code: 400,
        message: 'No File uploaded',
      };
    }  
    try {    
      console.log('inside api')
      const result = await this.cloudinaryService.uploadFileFromLocal(File, Quality);
      console.log(result)
      return result;
    } catch (error) {
      console.log('Upload failed:', error);
      return {
        code: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
