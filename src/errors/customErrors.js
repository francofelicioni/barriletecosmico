const badRequest = (message = "Bad request") => {
    const error = new Error(message);
    error.status = 400;
    return error;    
}

const unAuthorized = (message = "UnAuthorized") => {
    const error = new Error(message);
    error.status = 401;
    return error;    
}

const forbidden = (message = "Forbidden") => {
    const error = new Error(message);
    error.status = 403;
    return error;    
}

const notFound = (message = "Not found") => {
    const error = new Error(message);
    error.status = 404;
    return error;    
}

const conflict = (message = "Conflict") => {
    const error = new Error(message);
    error.status = 409;
    return error;    
}

const tooManyRequests = (message = "Too many requests") => {
    const error = new Error(message);
    error.status = 429;
    return error;    
}

const serverError = (message = "Server error") => {
    const error = new Error(message);
    error.status = 500;
    return error;    
}

const notImplemented = (message = "Not implemented") => {
    const error = new Error(message);
    error.status = 501;
    return error;    
}


export default {
    badRequest,
    unAuthorized,
    forbidden,
    notFound,
    conflict,
    tooManyRequests,
    serverError,
    notImplemented
}