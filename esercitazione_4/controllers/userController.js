const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username: username})
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const signedToken = jsonwebtoken.sign({
                        _id: user._id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }, "CHIAVE_SUPER_SEGRETA")
                    /* La seguente chiamata a res.cookie non è necessaria
                    se utilizziamo la strategia Bearer token
                    Invece, dovremmo inserire il token all'interno del JSON di risposta
                     */
                    res.cookie("jwtToken", signedToken, {
                        sameSite: 'strict',
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 12)
                    }).json({
                        "message": "ok", "user": {
                            _id: user._id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    })
                } else {
                    res.json({"message": "error", "error": "Password errata"})
                }
            } else {
                res.json({"message": "error", "error": "Utente non trovato"})
            }
        } catch (e) {
            console.log(e)
            res.json({"message": "error", "error": "Errore"})
        }
    },

    verifyAuth: async (req, res, next) => {
        try {
            /* Se avessimo utilizzato la strategia Bearer token
            const token = req.headers.authorization.replace(
                "Bearer ",
                ""
            )
            anziché la seguente linea di codice
             */
          const token = req.cookies.jwtToken;
          console.log(token)
            const decodedToken = jsonwebtoken.decode(token, "CHIAVE_SUPER_SEGRETA")
            if (decodedToken) {
                const user = await User.findOne({_id: decodedToken._id})
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.json({message: "error", error: "Utente non trovato"})
                }
            } else {
                res.json({message: "error", error: "Token non valido"})
            }
        } catch (e) {
            console.log(e);
            res.json({message: "error", error: e});
        }
    }
}