import { CloudinaryService } from '../../filehandling/cloudinary';
export declare class UploadController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(File: any, Quality: string): Promise<unknown>;
}
