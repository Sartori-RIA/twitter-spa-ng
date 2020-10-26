import {BaseModel} from './base-model';
import {S3File} from './s3-file';
import {User} from './user';

export interface Postage extends BaseModel {
  content?: string;
  picture?: S3File;
  user_id?: number;
  user?: User;
}
