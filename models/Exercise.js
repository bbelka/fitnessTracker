const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required:"Exercise name is required!"
    },
    type: {
        type: String,
        enum: ['cardio', 'weights', 'yoga']
    },
    weight: {
        type: Number,
        required: function () {
            return this.type === 'weights';
        }
    },
    sets: {
        type: Number,
        required: function () {
            return this.type === 'weights';
        }
    },
    reps: {
        type: Number,
        required: function () {
            return this.type === 'weights';
        }
    },
    duration: {
        type: Number,
        required: function () {
            return this.type === 'yoga';
        }
    },
    distance: {
        type: Number,
        Required: function () {
            return this.type === 'cardio'
        }
    }

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;