const { Router } = require("express");
const {signupHandler , loginHandler, logoutHandler,getCurrentUser,} = require('../controllers/user')


const router = Router()

router.post('/signup',signupHandler)

router.post('/login',loginHandler)

router.get('/logout',logoutHandler)

router.get("/current-user", getCurrentUser);


module.exports = router
