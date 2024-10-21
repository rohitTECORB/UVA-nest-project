"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("../../filehandling/cloudinary");
const platform_express_1 = require("@nestjs/platform-express");
let UploadController = class UploadController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadFile(File, Quality) {
        console.log(File.name);
        if (!File) {
            return {
                code: 400,
                message: 'No File uploaded',
            };
        }
        try {
            console.log('inside api');
            const result = await this.cloudinaryService.uploadFileFromLocal(File, Quality);
            console.log(result);
            return result;
        }
        catch (error) {
            console.log('Upload failed:', error);
            return {
                code: 500,
                message: 'Internal Server Error',
            };
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Put)('uploadFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('File')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('Quality')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [cloudinary_1.CloudinaryService])
], UploadController);
//# sourceMappingURL=stream.cloudinary.js.map