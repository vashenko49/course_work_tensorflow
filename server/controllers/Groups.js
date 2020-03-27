const {validationResult} = require("express-validator");
const _ = require("lodash");
const GroupsModel = require('../models/Groups');

exports.createGroup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name} = req.body;

        let group = await GroupsModel.findOne({name});
        if (!_.isNull(group)) {
            return  res.status(409).json({
                message: "Group already exists"
            });
        }

        await (new GroupsModel({name})).save();

        return res.status(200).json({
            message: "Group success created"
        });

    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        return res.status(200).json(await GroupsModel.find());
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};