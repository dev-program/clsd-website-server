const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const userInformation = db.userInformations;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { verifyToken } = require("../middleware/authJwt");
/* 
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
*/
/*
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            // Create UserInformation entry
            userInformation.create({
              userId: user.id,
              fullName: req.body.username
            }).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          // Create UserInformation entry
          userInformation.create({
            userId: user.id,
            fullName: req.body.username
          }).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
*/



const nodemailer = require('nodemailer');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verificationCode: Math.floor(100000 + Math.random() * 900000), // generate a random verification code
    isVerified: false, // set the user as unverified
  })
    .then(async (user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            // Send a verification email to the user
            const transporter = nodemailer.createTransport({
              service: 'gmail.com',
              auth: {
                user: 'nicerprojectII@gmail.com',
                pass: 'jewbgrpiqdjapper',
              },
            });

            const mailOptions = {
              from: 'nicerprojectII@gmail.com',
              to: user.email,
              subject: 'Please verify your email address',
              html: `<p>Hi ${user.username},</p><p>Thanks for signing up! Please click the following link to verify your email address:</p><p><a href="http://localhost:5001/verify/${user.verificationCode}">Verify Email</a></p><p>If you did not sign up for an account, please ignore this email.</p>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log(`Email sent: ${info.response}`);
              }
            });

            res.send({ message: 'User registered successfully! Please check your email to verify your account.' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
           // Send a verification email to the user
           const transporter = nodemailer.createTransport({
            service: 'gmail.com',
            auth: {
              user: 'nicerprojectII@gmail.com',
              pass: 'jewbgrpiqdjapper',
            },
          });

          const mailOptions = {
            from: 'nicerprojectII@gmail.com',
            to: user.email,
            subject: 'Please verify your email address',
            html: `<p>Hi ${user.username},</p><p>Thanks for signing up! Please click the following link to verify your email address:</p><p><a href="http://localhost:5001/api/auth/verifyEmail/${user.verificationCode}">Verify Email</a></p><p>If you did not sign up for an account, please ignore this email.</p>`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`Email sent: ${info.response}`);
            }
          });

          res.send({ message: 'User registered successfully! Please check your email to verify your account.' });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

/*
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      if (!user.isVerified) {
        return res.status(401).send({
          accessToken: null,
          message: "Please verify your email before signing in."
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

*/
exports.changePassword = (req, res) => {
  // Verify token
  verifyToken(req, res, () => {
    // Find User in Database
    User.findByPk(req.userId).then(user => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      // Check if provided old password matches the one in the database
      const passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);
      if (!passwordIsValid) {
        res.status(401).send({ message: "Invalid old password" });
        return;
      }

      // Update user's password in the database
      User.update(
        { password: bcrypt.hashSync(req.body.newPassword, 8) },
        { where: { id: req.userId } }
      ).then(num => {
        if (num == 1) {
          res.send({ message: "Password updated successfully!" });
        } else {
          res.send({ message: "Failed to update password" });
        }
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  });
};

exports.verificationEmail = async (req, res) => {
  const verificationCode = req.params.verificationCode;

  try {
    const user = await User.findOne({ where: { verificationCode } });
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.send({ message: 'Email address verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};




exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      if (!user.isVerified) {
        return res.status(401).send({
          accessToken: null,
          message: "Please verify your email before signing in."
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 43200 // 1 min  (expiration time in seconds)
      });

      // Store the session token in the user object or in a separate session model
      user.sessionToken = token;
      user.save().then(() => {
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            expiresIn: 43200 // Return expiration time to the client
          });
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
