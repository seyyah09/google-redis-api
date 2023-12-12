import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        console.log(`deneme ${process.env.jwt_secret} ${ExtractJwt.fromAuthHeaderAsBearerToken()}`);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.jwt_secret}`,
        });
    }

    validate(payload: any) {
        console.log(`jwt str.a gelen payload soyle: ${payload}`);
        return { user: payload.sub, username: payload.username };
    }
}