const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

const {createGroup, getAllGroups} = require('../controllers/Groups');


// @route   POST api/groups
// @desc    Create a new group
// @access  Public
router.post('/',
    [
        passport.authenticate("jwt-admin", {session: false}),
        check("name", "Name is required")
            .not()
            .isEmpty(),
    ],
    createGroup
);


// @route   GET api/groups
// @desc    get all groups
// @access  Public
router.get('/',
    passport.authenticate("jwt-admin", {session: false}),
    getAllGroups
);

module.exports = router;