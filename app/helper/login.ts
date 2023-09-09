import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CookieStorage
} from "amazon-cognito-identity-js";

export interface ILoginCallback {
    onSuccess: (
        email: string,
    ) => void;
    onFailure: (err: string) => void;
}

export function login(formData: {password: string; email: string}, callbacks: ILoginCallback) {
    const userPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_YFNT7b4nQ',
        ClientId: '67oda21n4538a52ub88r0tav24',
    });

    const cognitoUser = new CognitoUser({
        Username: formData.email,
        Pool: userPool,
        Storage: new CookieStorage({domain: "localhost"})
    });

    const authenticationDetails = new AuthenticationDetails({
        Username: formData.email,
        Password: formData.password,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            cognitoUser.getUserAttributes(function (err, result) {
                if (err) {
                    callbacks.onFailure(err.message)
                    return;
                }
                console.log("result", result)
                callbacks.onSuccess("result")
            });
            console.log("access_token", result.getAccessToken());
        },
        onFailure: (err) => {
            callbacks.onFailure(err)
        },
    });
}