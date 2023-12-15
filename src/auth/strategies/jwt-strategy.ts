import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        console.log(process.env.jwtsecret);
        //const secretFromDotEnvFile: string = process.env.jwtsecret;
        //console.log(`secret from dotenv check: ${secretFromDotEnvFile}`);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.jwtsecret
        });
    }

    async validate(payload: any) {
        return { username: payload.username, user: payload.sub };
    }
}