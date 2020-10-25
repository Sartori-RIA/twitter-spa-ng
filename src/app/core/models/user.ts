import {S3File} from './s3-file';
import {BaseModel} from './base-model';

export interface User extends BaseModel {
  user_name: string;
  name: string;
  email: string;
  avatar: S3File;
  banner: S3File;
}
