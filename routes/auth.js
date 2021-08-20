const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc authenticate with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auh/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    })


// @desc Logout User
// @route /auth/logout
router.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })
    //then require in app.js
module.exports = router