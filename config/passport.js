const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
  
        if (!user) {
          return done(null, false, { message: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
  
        if (isMatch) {
          return done(null, user);
        } else {
          console.log(`Password comparison failed for email: ${email}`);
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  }

