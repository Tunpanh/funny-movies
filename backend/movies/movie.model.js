const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sharedBy: { type: String, required: true },
    youtubeUrl: { type: String, unique: true, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Movie', schema);