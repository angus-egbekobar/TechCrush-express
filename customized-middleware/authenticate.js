//Another example for Custom Authentication Middleware 
// This middleware checks if the request has a valid token in the headers

const authenticate = (req, res, next) => { // Extract token from Authorization header (e.g., "Bearer <token>")
  const authHeader = req.headers['validtoken']; // // e.g., "Bearer mysecrettoken123"
  const expectedToken = req.headers['expectedtoken']; // e.g., "mysecrettoken123"


// The below line of code safely extracts the token from the header string.
// It first checks if 'authHeader' exists (i.e., is not undefined or null).
// If it does, it splits the string by a space (e.g., "Bearer mysecrettoken123" becomes ["Bearer", "mysecrettoken123"])
// Then it grabs the second part (index 1), which is the actual token.
// If 'authHeader' is missing, the whole expression evaluates to undefined to avoid runtime errors.
  const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer "

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
 if (token !== expectedToken) {
    return res.status(403).json({ message: 'Invalid token. Access forbidden.' });
  }

  // You can optionally log or store the token here for further use
  req.token = token;  //Attach token to request object if needed later


  next(); // Token exists, proceed to route
};

export default authenticate;