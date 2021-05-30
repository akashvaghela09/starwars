import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from './actionType'

const getRequest = () => {
    return {
        type: GET_REQUEST     
    }
}

const getSuccess = (payload) => {
    return {
        type: GET_SUCCESS,
        payload
    }
}

const getFailure = () => {
    return {
        type: GET_FAILURE
    }
}

export { 
    getRequest,
    getSuccess,
    getFailure
}