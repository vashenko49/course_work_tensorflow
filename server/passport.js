const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UsersModel = require('./models/Users');
const mongoose = require('mongoose');
const lodash = require('lodash');

module.exports = async passport => {
    const optsJWT = {};
    optsJWT.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    optsJWT.secretOrKey = "rock1nbvv";

    passport.use("jwt-local", new JwtStrategy(optsJWT, async (jwt_payload, done) => {
        try {
            const {_id} = jwt_payload.data;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return done(null, false);
            }
            const oldUser = await UsersModel.findById(_id);
            if (!lodash.isNull(oldUser)) {
                return done(null, jwt_payload.data);
            }
            return done(null, false);
        } catch (e) {
            return done(e, false, e.message);
        }
    }));
    passport.use("jwt-admin", new JwtStrategy(optsJWT, async (jwt_payload, done) => {
        try {
            const {_id} = jwt_payload.data;
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return done(null, false);
            }
            const oldUser = await UsersModel.findById(_id);
            if (!lodash.isNull(oldUser)) {
                if (oldUser.isAdmin) {
                    return done(null, jwt_payload.data);
                }
            }

            return done(null, false);
        } catch (e) {
            return done(e, false, e.message);
        }
    }))
};
