const mongoose = require('mongoose')
const { Schema, model } = mongoose
const userSchem = new Schema({
    name: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String,
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})
userSchem.methods.addFollowing = function (user_id) {
    if (this.followings.indexOf(user_id) === -1) {
        this.followings.push(user_id) //KO thể push nguyên obj JSON userSchem vì IN args chỉ có "user_id"
    }
    return this.save()
}
userSchem.methods.addFollower = function (follower) {
    if (this.followers.indexOf(follower._id) === -1) {
        this.followers.push(follower)
        // nguyên cả hàm nếu KO save() thì users>followers[] sẽ luôn blank!
        return this.save()
            .then(res => {
                console.log('addFollower() OK: ', res)
            })
            .catch(err => {
            })
    }
}

module.exports = model('user', userSchem)

