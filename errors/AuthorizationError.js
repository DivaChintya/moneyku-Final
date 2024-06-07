class  AuthorizationError extends Error {
    constructor(message, statusCode = 401) {
    	        super(message); //manggil class error dgn parameter message
    	
    	        this.statusCode = message;
            this.name = 'AuthorizationError'
    }
}
    	
    module.exports = AuthorizationError;
    