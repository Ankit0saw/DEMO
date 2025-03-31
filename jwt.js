const jwt=require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying JWTs

const jwtAuthMiddleware=(req,res,next)=>{
    //extrqct the jwt token from the request header
    const token=req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    //check if the token is provided or not
    if(!token){
        return res.status(401).json({error:'Unauthorized'}); // Return 401 Unauthorized if no token is provided
    }

    try{
        //verify the token using the secret key
        const decoded=jwt.verify(token,process.env.JWT_SECRET); // Verify the token using the secret key from environment variables
        req.user=decoded; // Attach the decoded token data to the request object
        next(); // Call the next middleware or route handler
    }
    catch(err){
        console.log(err);
        return res.status(403).json({error:'Forbidden/Invalid token'}); // Return 403 Forbidden if token verification fails
    }
}

//function to generate JWT token
const generateToken=(userData)=>{
    //create a jwt token using the user data and secret key
    const token=jwt.sign(userData,process.env.JWT_SECRET); // Create a JWT token with expiration time of 1 hour
    return token; // Return the generated token
}

module.exports={jwtAuthMiddleware,generateToken}; 