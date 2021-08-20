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
    //then require in app.js
module.exports = router