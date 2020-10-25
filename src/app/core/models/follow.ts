import {BaseModel} from './base-model';
import {User} from './user';

export interface Follow extends BaseModel {
  user_id: number;
  follow_id: number;
  user: User;
  follow: Follow;
}

export type FollowTitles = 'SEGUIR' | 'DEIXAR DE SEGUIR';
