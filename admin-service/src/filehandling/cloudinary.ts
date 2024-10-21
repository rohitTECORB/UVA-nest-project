import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as sharp from 'sharp';

cloudinary.config({
  cloud_name: 'dnrkoe03q',
  api_key: '898967894879726',
  api_secret: '8jGoJwwk-h53GD2EWeGJtC8rmNE',
});

@Injectable()
export class CloudinaryService {
  async uploadFileFromLocal(File, Quality:string) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      console.log(Quality)      
      sharp(File.buffer)
        .metadata()
        .then((metadata) => {
        var percentage;
         if(Quality == 'High'){
          percentage = 40;      
         }else if(Quality == 'Medium'){
          percentage = 25;
         }else if(Quality == 'Low'){
          percentage = 10;
         }else {
          percentage = 100;
         }         
          const newWidth = Math.round(metadata.width * (percentage / 100));
          console.log(newWidth)
          const newHeight = Math.round(metadata.height * (percentage / 100));
          console.log(newHeight)     
          const sharpStream = sharp(File.buffer)
            .resize({
              width: newWidth,
              height: newHeight,              
            })         
          const uploadOptions = {
            folder: 'upload',          
          };
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              const endTime = Date.now();
              const uploadDuration = endTime - startTime;
              if (error) {
                console.log('Error:', error);
                reject(error);
              } else {
                console.log(`Upload duration: ${uploadDuration} ms`);
                resolve(result);
              }
            }
          );
          sharpStream.pipe(uploadStream);
        })
        .catch((err) => {
          console.log('Error reading image metadata:', err);
          reject(new Error('Error reading image metadata.'));
        });
    });
  }
}
