import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  CookieStorage,
} from "amazon-cognito-identity-js";

export interface ILoginCallback {
  onSuccess: (email: string) => void;
  onFailure: (err: string) => void;
}

export interface ISignUpCallback {
  onSuccess: (email: string) => void;
  onFailure: (err: string) => void;
}

const USER_POOL_ID = "us-east-1_YFNT7b4nQ";
const CLIENT_ID = "67oda21n4538a52ub88r0tav24";
const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export interface User {
  username: string | undefined;
  accessToken: string | undefined;
  email: string | undefined;
  isPro: boolean;
}

const cookieStorage = new CookieStorage();
const cognitoUserPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
  Storage: cookieStorage,
});

export function login(
  formData: { password: string; email: string },
  callbacks: ILoginCallback,
) {
  const cognitoUser = new CognitoUser({
    Username: formData.email,
    Pool: userPool,
    Storage: cookieStorage,
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: formData.email,
    Password: formData.password,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      callbacks.onSuccess("result");
    },
    onFailure: (err) => {
      callbacks.onFailure(err);
    },
  });
}

export function signup(
  formData: { username: string; password: string; email: string },
  callbacks: ISignUpCallback,
) {
  const attributes = [
    new CognitoUserAttribute({ Name: "email", Value: formData.email }),
  ];

  userPool.signUp(
    formData.username,
    formData.password,
    attributes,
    [],
    function (err, result) {
      if (err) {
        callbacks.onFailure(err.message);
        return;
      }
      var cognitoUser = result!.user;
      console.log("user name is " + cognitoUser.getUsername());
      callbacks.onSuccess(formData.email);
    },
  );
}

export function confirmSignUp(
  formData: { username: string; code: string },
  callbacks: ISignUpCallback,
) {
  const cognitoUser = new CognitoUser({
    Username: formData.username,
    Pool: userPool,
    Storage: cookieStorage,
  });

  cognitoUser.confirmRegistration(formData.code, true, function (err, result) {
    if (err) {
      console.log(err);
      callbacks.onFailure(err.message);
      return;
    }
    callbacks.onSuccess(formData.username);
  });
}

export function getCurrentUser(
  withDetails: boolean = false,
): Promise<null | User> {
  return new Promise((resolve, reject) => {
    const cognitoUser = cognitoUserPool.getCurrentUser();

    if (cognitoUser === null) {
      resolve(null);
      return;
    }

    cognitoUser.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
          return;
        }

        if (session === null || !session.isValid()) {
          resolve(null);
          return;
        }

        // Check if user is a Pro user, for that inside the cognito:groups it should contain the Pro element

        const isPro = session.getAccessToken().payload["cognito:groups"]?.includes("Pro");
        console.log("Is Pro: ", isPro)
        if (!withDetails) {
          resolve({
            username: cognitoUser.getUsername(),
            accessToken: session.getAccessToken().getJwtToken(),
            isPro: isPro
          } as User);
          return; // no need to fetch details if we don't need them.
        }

        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            reject(err);
            return;
          }
          const email = result!
            .find((r) => r.getName() === "email")
            ?.getValue();
          resolve({
            username: cognitoUser.getUsername(),
            accessToken: session.getAccessToken().getJwtToken(),
            email,
            isPro: isPro
          });
          return;
        });
      },
    );
  });
}

export function signout() {
  cognitoUserPool.getCurrentUser()?.signOut();
}

export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}
