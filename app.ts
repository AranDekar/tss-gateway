require('module-alias/register');
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as api from './api';
const swaggerExpress = require('swagger-express-mw');
const cors = require('cors');
const app = require('express')();
const jwtService = new api.helpers.JwtTokenService();
module.exports = app; // for testing
const port = process.env.PORT || 10020;

api.helpers.Google.use();
app.use(passport.initialize());
app.use(cookieParser());

export let swaggerConfig = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: api.helpers.swaggerSecurityConfig,
};

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (origin === undefined) {
      callback(null, false);
    } else {
      // change wordnik.com to your allowed domain.
      const match = origin.match('^(.*)?.localhost(\:[0-9]+)|(.*)?.127.0.0.1(\:[0-9]+)?');
      const allowed = (match !== null && match.length > 0);
      callback(null, allowed);
    }
  },
};

swaggerExpress.create(swaggerConfig, (err, swagger) => {
  if (err) { throw err; }
  app.use((req, res, next) => {
    next();
  });

  app.use(cors(corsOptions));
  swagger.register(app);

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      session: false,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  app.get('/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', {
        session: false,
        failureRedirect: api.helpers.Config.settings.ui_base_path,
      },
        (error, user: api.models.UserModel, info) => {
          if (error) { return next(error); }
          if (!user) { return res.redirect(api.helpers.Config.settings.ui_base_path); }
          try {
            const token = jwtService.signToken(user);
            // to prevent from csrf attack we sent back a XSRF-TOKEN in a cookie
            res.cookie('XSRF-TOKEN', token.xsrf, { maxAge: 900000, httpOnly: false });
            res.cookie('JWT-TOKEN', token.jwt, { maxAge: 900000, httpOnly: true });
            let isAdmin = 'false';
            if (user.roles && user.roles.indexOf('admin') > -1) {
              isAdmin = 'true';
            }
            return res.redirect(
              `${api.helpers.Config.settings.ui_base_path}/#/login?user_id=${user.id}&is_admin=${isAdmin}`);
          } catch (err) {
            return next(err);
          }
        })(req, res, next);
    });

  app.listen(port);

  if (swagger.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
