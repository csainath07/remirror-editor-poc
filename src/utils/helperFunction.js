import { CONTENT_TYPE } from "./constant";

export const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36);
}

export const EMPTY_BLOCK = () => {
    return {
        id: uid(),
        type: CONTENT_TYPE['HTML'],
        content: {
            html: ""
        }
    }
}