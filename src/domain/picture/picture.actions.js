import { getPictures, getPictureById, likePicture, unlikePicture, commentPicture } from './picture.service';

export const types = {
    PICTURE_STARTED: 'PICTURE_STARTED',
    PICTURE_DONE: 'PICTURE_DONE',
    PICTURE_LIKED: 'PICTURE_LIKED',
    PICTURE_UNLIKED: 'PICTURE_UNLIKED',
    PICTURE_COMMENTED: 'PICTURE_COMMENTED',
    PICTURE_FAILED: 'PICTURE_FAILED'
}

export function fetchPictures(dispatch) {
    dispatch(_started());
    getPictures()
        .then(pictures => dispatch(_onSuccess(pictures)))
        .catch(error => dispatch(_onError(error)));
}

export function fetchPictureById(dispatch, pictureId) {
    dispatch(_started());
    getPictureById(pictureId)
        .then(picture => dispatch(_onSuccess([picture])))
        .catch(error => dispatch(_onError(error)));
}

export function LikePictureById(dispatch, pictureId) {
    dispatch(_started());
    likePicture(pictureId)
        .then(picture => dispatch(_onLiked(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function unlikePictureById(dispatch, pictureId) {
    dispatch(_started());
    unlikePicture(pictureId)
        .then(picture => dispatch(_onUnliked(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function commentPictureById(dispatch, pictureId, comment) {
    dispatch(_started());
    commentPicture(pictureId, comment)
        .then(picture => dispatch(_onComment(picture)))
        .catch(error => dispatch(_onError(error)));
}

function _started() {
    return {
        type: types.PICTURE_STARTED
    }
}

function _onSuccess(pictures) {
    return {
        type: types.PICTURE_DONE,
        payload: pictures
    }
}

function _onLiked(picture) {
    return {
        type: types.PICTURE_LIKED,
        payload: picture
    }
}

function _onUnliked(picture) {
    return {
        type: types.PICTURE_UNLIKED,
        payload: picture
    }
}

function _onComment(picture) {
    return {
        type: types.PICTURE_COMMENTED,
        payload: picture
    }
}

function _onError(error) {
    return {
        type: types.PICTURE_FAILED,
        payload: error
    }
}