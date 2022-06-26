const { Schema, Type, model} = require('mongoose');
const { stringify } = require('querystring');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: string,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([/da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/],
        },
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'users'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;