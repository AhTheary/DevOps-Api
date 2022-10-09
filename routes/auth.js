var express = require('express')
const joiValidation = require('../middlewares/joiValidation')
const auth = require('../middlewares/auth')
const { signInSchema, signUpSchema } = require('../schemas')
var router = express.Router()
const { login } = require('../services/login')
const { register } = require('../services/register')
const userService = require('../services/user')
const { logout } = require('../services/logout')
var jwt = require('jsonwebtoken')

router.post('/me', auth.ensureSignedIn, auth.currentUser, async function(
        req,
        res,
        next,
    ) {
        const { currentUser } = req
        const result = await userService.findById(currentUser)
        res.json(result)
    })
    // for user
router.get('/me', auth.ensureSignedIn, auth.currentUser, async function(
    req,
    res,
    next,
) {
    const { currentUser } = req
    const result = await userService.findById(currentUser)
    res.json(result)
})

router.post('/logout', async(req, res) => {
    const result = logout(req.session)
    return res.clearCookie('access_token').json(result)
})

router.post(
    '/login',
    auth.ensureSignedOut,
    joiValidation(signInSchema),
    async(req, res, next) => {
        const { username, password } = req.body
        const result = await login(username, password)
        if (result.success) req.session.jwt = result.data.token
        res.json(result)
    },
)

router.post(
    '/adminLogin',
    auth.ensureSignedOut,
    joiValidation(signInSchema),
    async(req, res, next) => {
        try {
            const { username, password } = req.body
            const result = await login(username, password)
            console.log(result)
                //check if user is admin role
            if (result.data.user.role === 'admin') {
                req.session.jwt = result.data.token
                res.json({ success: true, data: result.data })
            } else {
                res.json({ success: false, error: 'user not admin' })
            }
        } catch (err) {
            res.json({ success: false, error: err })
        }
    },
)

router.post(
    '/register',
    auth.ensureSignedOut,
    joiValidation(signUpSchema),
    async(req, res, next) => {
        const createdUser = await register(req.body)
        res.json(createdUser)
    },
)

module.exports = router