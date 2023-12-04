import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        const strategy = {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: [ 'profile', 'email' ]
        };
        super(strategy);
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {

        const user = await this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            displayName: profile.displayName,
        });

        return user || null;
    }
}