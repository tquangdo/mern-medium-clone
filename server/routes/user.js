const userCon = require('../controllers/user.ctrl')

module.exports = router => {

    /**
     * get all users
     */
    router
        .route('/users')
        .get(userCon.getAll)

    /**
     * get a user
     */
    router
        .route('/users/:id')
        .get(userCon.getUser)

    /**
     * get a user profile
     */
    router
        .route('/users/profile/:id')
        .get(userCon.getUserProfile)

    /**
     * add a user
     */
    router
        .route('/user')
        .post(userCon.addUser)

    /**
     * follow a user
     */
    router
        .route('/user/follow')
        .post(userCon.followingUser)
}