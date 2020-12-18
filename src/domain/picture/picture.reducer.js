import { types } from './picture.actions';

export default function reducer(state, action) {
    const { pictures, user } = state;
    let currentImageIndex;

    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            currentImageIndex = pictures.findIndex(picture => picture._id === action.payload._id);
            pictures[currentImageIndex].likedBy = [...pictures[currentImageIndex].likedBy, { _id: user._id }];
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_UNLIKED:
            currentImageIndex = pictures.findIndex(picture => picture._id === action.payload._id);
            const userIndex = pictures[currentImageIndex].likedBy.findIndex(like => like._id === user._id);
            if (userIndex > -1) {
                pictures[currentImageIndex].likedBy.splice(userIndex, 1);
            }
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_COMMENTED:
            currentImageIndex = pictures.findIndex(picture => picture._id === action.payload._id);
            pictures[currentImageIndex].comments = action.payload.comments;
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
