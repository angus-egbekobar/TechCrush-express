// customized  middleware function to check for an 'api_key' header in the request
const checkAuth = (req, res, next) => {
  if(req.headers['api_key'] && req.headers.api_key === '12345') { // Check if the 'api_key' header is present and valid
    next(); // Call the next middleware or route handler . This is important to pass control to the next function in the stack.
  }else{
    res.status(401).json({ message: "Unauthorized: Invalid or missing API Key" }); // Send a 401 Unauthorized response if the API key is invalid or missing
  }
}


export default checkAuth;
// customized  middleware function to check for an 'api_key' header in the request
// Another example for Custom Authentication Middleware