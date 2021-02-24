import User from '../models/user.model.js'
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

passport.use(new LocalStrategy(
    {
        "usernameField":'email',
        "passwordField":"password"
    },
    async function (username,password,cb){
        console.log(username,password)
        try{
            const user = await User.findOne({username: username.toString()})
            if(!user){
                return cb(null,false)
            }
            if(user && ! await user.matchPassword(password)){
                return cb(null,false)
            }
            return cb(null,user)
        }
        catch (e) {
            console.log('e');
            return cb(e)
        }
    }
))

export default passport