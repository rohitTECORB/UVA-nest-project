"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const sharp = require("sharp");
cloudinary_1.v2.config({
    cloud_name: 'dnrkoe03q',
    api_key: '898967894879726',
    api_secret: '8jGoJwwk-h53GD2EWeGJtC8rmNE',
});
let CloudinaryService = class CloudinaryService {
    async uploadFileFromLocal(File, Quality) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            console.log(Quality);
            sharp(File.buffer)
                .metadata()
                .then((metadata) => {
                var percentage;
                if (Quality == 'High') {
                    percentage = 40;
                }
                else if (Quality == 'Medium') {
                    percentage = 25;
                }
                else if (Quality == 'Low') {
                    percentage = 10;
                }
                else {
                    percentage = 100;
                }
                const newWidth = Math.round(metadata.width * (percentage / 100));
                console.log(newWidth);
                const newHeight = Math.round(metadata.height * (percentage / 100));
                console.log(newHeight);
                const sharpStream = sharp(File.buffer)
                    .resize({
                    width: newWidth,
                    height: newHeight,
                });
                const uploadOptions = {
                    folder: 'upload',
                };
                const uploadStream = cloudinary_1.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                    const endTime = Date.now();
                    const uploadDuration = endTime - startTime;
                    if (error) {
                        console.log('Error:', error);
                        reject(error);
                    }
                    else {
                        console.log(`Upload duration: ${uploadDuration} ms`);
                        resolve(result);
                    }
                });
                sharpStream.pipe(uploadStream);
            })
                .catch((err) => {
                console.log('Error reading image metadata:', err);
                reject(new Error('Error reading image metadata.'));
            });
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.js.map