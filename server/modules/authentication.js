var jwt = require("jsonwebtoken");
var _ = require("lodash");
var bcrypt = require("bcrypt");

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var User = require('../database/mongo/schemas/user');

var adminUser = new User({
    username: 'admin',
    password: bcrypt.hashSync('password',10),
    email: 'admin@gtatelecom.com'
});

adminUser.save((err)=>{
    if(err){
        console.log(err.message);
        console.log("duplicate username or email!!");
    } else {
        console.log("User admin created");
    }  
});

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "tasmanianDevil";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log("payload received", jwt_payload);

    User.findById(jwt_payload.id, (err, user)=>{
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
    });

});

var isAuthenticated = function (username, password, res) {

    User.findOne({username: username}, (err, user)=>{
        if( ! user ){
            res.status(401).json({message:"Wrong UserName or Password"});
        } else {
            bcrypt.compare(password, user.password, function( error, result){
                if(result) {
                    var payload = {id: user._id};
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({message: "ok", token: token});
                } else {
                    res.status(401).json({ message: "Wrong UserName or Password" });
                }
            });
          }
    });
};

passport.use(strategy);

module.exports = {
    passport: passport,
    isAuthenticated: isAuthenticated
};