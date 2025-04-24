const { register, login, logout, refresh } = require('../controlers/authControlers')
const { loginValidation, rgisterValidation } = require('../midelWares/Validations/usersSchema_validation')

const router = require('express').Router()



router.route('/register')
    .post(rgisterValidation(), register)


router.route('/login')
    .post(loginValidation(), login)

router.route('/logout')
    .post(logout)

router.route('/refresh')
    .get(refresh)

module.exports = router