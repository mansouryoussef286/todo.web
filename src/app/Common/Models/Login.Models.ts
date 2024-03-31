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
        Id!: number;
        FirstName!: string;
        LastName!: string;
        Email!: string;
        ProfilePicturePath!: string;
    }

    export class RefreshTokenReqModel {
        UserId!: number;
        AccessToken!: string;
        RefreshToken!: string;
    }

    export class RefreshTokenResModel {
        AccessToken!: string;
        RefreshToken!: string;
    }

}