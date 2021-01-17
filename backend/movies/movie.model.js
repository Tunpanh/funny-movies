const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sharedBy: { type: String, required: true },
    youtubeUrl: { type: String, unique: true, required: true },
    thumbnailUrl: { type: String },
    title: { type: String },
    description: { type: String },
    likeCount: { type: String },
    dislikeCount: { type: String },
});

schema.virtual('youtubeId').get(function() {
    return this.youtubeUrl.split('?')[1].split('&')[0].split('=')[1];
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Movie', schema);