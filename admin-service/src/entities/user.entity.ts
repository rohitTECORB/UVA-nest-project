import { timeStamp } from 'console';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import moment from 'moment'

@Entity('users')  

export class User {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })  
  email: string;

  @Column({unique:true})
  password: string;

  @Column()
  contact: string;

  @Column()
  token: string;

  @Column()
  otp: number;

  @Column()
  isActive: Boolean;

  @Column()
  updatedAt: Date

  @Column()
  createdAt: Date

  @Column()
  isDelete:Boolean

  @Column()
  toDate: Date

  @Column()
  fromDate: Date

  @Column()
  countryCode: String

  @Column()
  emailVarify: Boolean

  @Column()
  mobileVerify: Boolean

  @Column()
  notify_status: String

  @Column({default: 'english'})
  language: String

  @Column()
  role:String
}


  
