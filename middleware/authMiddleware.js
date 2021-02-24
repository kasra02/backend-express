import expressJwt from "express-jwt";

let middlewareObject = {};

export const requireSignin = expressJwt(
    { secret:  process.env.JWT_SECRET, algorithms: ['HS256']}
    );


middlewareObject.isAdmin = (req,res,next) => {
    if(!req.isAuthenticated()){
        res.status(401)
        throw new Error('your are not logged in')
    }
    if(!req.user.role==1){
        res.status(401)
        throw new Error('your are authorize')
    }
    next()
}

middlewareObject.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    throw new Error('isLoggedIn')
};

middlewareObject.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    throw new Error('you are not logged in')
};

export default middlewareObject