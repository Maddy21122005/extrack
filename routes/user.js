const { Router } = require("express");
const {signupHandler , loginHandler, logoutHandler} = require('../controllers/user')


const router = Router()

router.post('/signup',signupHandler)

router.post('/login',loginHandler)

router.get('/logout',logoutHandler)


module.exports = router
