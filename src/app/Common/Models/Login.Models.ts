export namespace LoginModels {
    export class AutheticationResponse {
        code!: string;
        state!: string;
    }

    export class ValidateCodeResponse {
        Success!: boolean;
        AccessToken!: string;
        RefreshToken!: string;
        CurrentUser!: CurrentUser
    }

    export class CurrentUser {
        UserId!: number;
        FirstName!: string;
        LastName!: string;
        Email!: string;
        ProfilePicturePath!: string;
    }

    export class RefreshTokenReqModel {
        Email!: string;
        AccessToken!: string;
        RefreshToken!: string;
    }

    export class RefreshTokenResModel {
        AccessToken!: string;
        RefreshToken!: string;
    }

}