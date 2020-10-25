import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, UserState} from './user.reducer';

export const userFeatureSelector = createFeatureSelector<UserState>(featureKey);

export const selectUser = createSelector(
  userFeatureSelector,
  (state) => state.user
);

export const selectUserLoading = createSelector(
  userFeatureSelector,
  (state) => state.loading
);
