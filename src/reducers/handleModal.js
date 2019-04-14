import { SHOW_LIKERS } from "../actions/index";
import { HIDE_LIKERS } from "../actions/index";

export default function (state = {}, action) {
    let newState = {};
    switch (action.type) {
        case SHOW_LIKERS:
            const postID = action.payload;
            newState = { ...state };
            newState["postID"] = postID;
            return newState;
        case HIDE_LIKERS:
            return false;
        default:
            return false;
    }
};