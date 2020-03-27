const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ]

});

module.exports = Groups = mongoose.model("groups", GroupsSchema, "groups");