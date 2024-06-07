class ClientError extends Error {
    constructor(message, statusCode = 400) {
    	        super(message); //manggil class error dgn parameter message
    	
    	        this.statusCode = message;
            this.name = 'ClientError'
    }
}
    	
    module.exports = ClientError;
    