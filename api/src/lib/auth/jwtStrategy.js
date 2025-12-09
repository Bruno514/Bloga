import "dotenv/config";
import { default as JwtStrategy } from "passport-jwt/lib/strategy.js";
import { ExtractJwt } from "passport-jwt";
import { prisma } from "../prisma.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// eslint-disable-next-line no-undef
opts.secretOrKey = process.env.SECRET_KEY; //normally store this in process.env.secret

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    let user = await prisma.user.findUnique({
      where: { id: jwt_payload.id },
      include: { role: true }
    });

    user = {
      id: user.id,
      name: user.name,
      user: user.email,
      role: user.role.name,
    };


    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
