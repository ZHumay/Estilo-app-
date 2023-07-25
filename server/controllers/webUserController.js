const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const moment = require("moment");
const bcrypt = require('bcrypt');
const { WebUser } = require("../models/webUser");

let privateKey = "ironmaiden"

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: "c8657545@gmail.com",
        pass: "bcozssymjajpqicg",
    },
});

function sendConfirmEMail(to, code) {
    transporter.sendMail({
        from: 'c8657545@gmail.com',
        to: to,
        subject: "Confirm Code",
        text: "Your confirm code: " + code,
    });
}

const webUserController = {
    register: (req, res) => {
        let email = req.body?.email.toLowerCase();
        WebUser.findOne({ email: email })
            .then(data => {
                if (data) {
                    res.status(500).json({ 'msg': 'Böyle bir kullanıcı mevcut' });
                } else {
                    let confirmCode = Math.floor(Math.random() * 10000);
                    let codeExpire = moment().add("59", "s");
                    const saltRounds = 10;

                    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
                        if (err) {
                            res.status(500).json({ 'msg': 'Error hashing the password' });
                        } else {
                            const webUser = new WebUser({
                                email: email,
                                username: req.body.username,
                                password: hashedPassword,
                                code: confirmCode,
                                codeExpire: codeExpire
                            });

                            webUser.save();
                            sendConfirmEMail(email, confirmCode);
                            res.json({ email });
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    confirm: (req, res) => {
        let code = req.body.code;
        let email = req.body.email;

        WebUser.findOne({ email: email })
            .then(user => {
                if (user.codeCounter == 0) {
                    res.status(500).json({ "message": "BLOCK!!" });
                } else {
                    if (user.code == code) {
                        if (user.codeExpire > moment()) {
                            let token = jwt.sign(email, privateKey);
                            user.isActive = true;
                            user.codeCounter = 3;
                            user.save();
                            res.json({ token });
                        } else {
                            res.status(500).json({ "message": "Expire Date Error!" });
                        }
                    } else {
                        user.codeCounter = user.codeCounter - 1;
                        user.save();
                        res.status(404).json({ "confirm code error:!": "Kalan hakkınız " + user.codeCounter });
                    }
                }
            });
    },

    login: (req, res) => {
        WebUser.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            res.status(500).json({ "message": "Server error" });
                        } else {
                            if (result) {
                                if (!user.isActive) {
                                    let confirmCode = Math.floor(Math.random() * 10000);
                                    let codeExpire = moment().add("30", "s");
                                    user.code = confirmCode;
                                    user.codeExpire = codeExpire;
                                    user.save();
                                    sendConfirmEMail(req.body.email, confirmCode);
                                    res.status(203).json({ "email": req.body.email });
                                } else {
                                    let token = jwt.sign(req.body.email, privateKey);
                                    res.status(200).json({ token });
                                }
                            } else {
                                res.status(404).json({ "message": "Email or password wrong!" });
                            }
                        }
                    });
                } else {
                    res.status(404).json({ "message": "Email or password wrong!" });
                }
            })
            .catch(err => {
                res.status(500).json(err, "server error");
            });
    },

    token: (req, res) => {
        let token = req.body.token;
        try {
            const email = jwt.verify(token, privateKey);
            WebUser.findOne({ email: email }).then(function (user) {
                res.status(200).json({ user: user });
            });
        } catch (error) {
            res.status(500).json({ "message": "Token error!" });
        }
    }
};

module.exports = {
    webUserController
};
