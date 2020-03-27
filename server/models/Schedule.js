const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    groupsId: {
        type: Schema.Types.ObjectId,
        ref: "groups"
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

module.exports = Schedule = mongoose.model("schedules", ScheduleSchema, "schedules");