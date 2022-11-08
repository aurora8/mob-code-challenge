/**
 * custom error for all Api constraints and errors
 */
export class ApiError extends Error {

    /**
     * catch all API Errors
     * 
     * @param message {string} the error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    }
}