import { PayloadAction } from '@reduxjs/toolkit';
import { getProfile } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { call, put, takeLatest } from 'redux-saga/effects';

function* handleGetUserInfoRequest({ payload }: PayloadAction<string>) {
    const { token, idToken, accessToken } = payload;
    try {
        if (token) {
            yield call(getProfile, token);
            yield put(userInfoActions.getUserInfoSuccess(token));
        }
        if (idToken) {
            yield put(userInfoActions.getUserInfoSuccess(idToken));
        }
        if (accessToken) {
            yield put(userInfoActions.getUserInfoSuccess(accessToken));
        }
    } catch (error) {
        yield put(userInfoActions.getUserInfoFailed(error));
    }
}

export default function* userInfoSaga() {
    // yield takeLatest(userInfoActions.getUserInfoRequest.type, handleGetUserInfoRequest);
    yield takeLatest('USER_FETCH_REQUESTED', handleGetUserInfoRequest);
}
