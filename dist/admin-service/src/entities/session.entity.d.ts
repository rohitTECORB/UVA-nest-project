import { ObjectId } from 'typeorm';
export declare class Session {
    id: ObjectId;
    vendorId: string;
    userId: string;
    adminId: string;
    token: string;
    type: string;
    timeStamp: string;
}
