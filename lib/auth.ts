import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  CookieStorage
} from "amazon-cognito-identity-js";

export interface ILoginCallback {
  onSuccess: (user: User) => void;
  onFailure: (err: string) => void;
}

export interface ISignUpCallback {
  onSuccess: (email: string) => void;
  onFailure: (err: string) => void;
}

export interface IForgotPasswordCallback {
  onSuccess: (email: string) => void;
  onFailure: (err: string) => void;
}

export interface IConfirmPasswordCallback {
  onSuccess: (email: string) => void;
  onFailure: (err: string) => void;
}

const USER_POOL_ID = process.env.NEXT_PUBLIC_AWS_USERPOOL_ID!;
const CLIENT_ID = process.env.NEXT_PUBLIC_AWS_APPCLIENT_ID!;
export const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export interface User {
  username: string;
  accessToken: string | undefined;
  email: string;
  isPro: boolean;
}

export const cookieStorage = new CookieStorage();
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

  try {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const isPro = session.getAccessToken().payload["cognito:groups"]?.includes("Pro");
        console.log("Is Pro: ", isPro);

        cognitoUser.getUserAttributes((error, result) => {
          if (error) {
            callbacks.onFailure(error.message);
            return;
          }
          const email = result!.find((r) => r.getName() === "email")?.getValue();
          callbacks.onSuccess({
            username: cognitoUser.getUsername(),
            accessToken: session.getAccessToken().getJwtToken(),
            email: email!,
            isPro: isPro
          });
          return;
        })
      },
      onFailure: (error) => {
        callbacks.onFailure(error instanceof Error ? error.message : "Unknown error");
      }
    });
  } catch (error) {
    callbacks.onFailure(error instanceof Error ? error.message : "Unknown error");
  }
}

export function forgotPassword(
  formData: { email: string },
  callbacks: IForgotPasswordCallback,
) {
  const cognitoUser = new CognitoUser({
    Username: formData.email,
    Pool: userPool,
    Storage: cookieStorage,
  });


  cognitoUser.forgotPassword({
    onSuccess: function (data) {
      // successfully initiated reset password request
      console.log('CodeDeliveryData from forgotPassword: ' + data);
      callbacks.onSuccess(formData.email)

    },
    onFailure: function (err) {
      callbacks.onFailure(err.message);
    },
  });
}

export function confirmPassword(
    formData: { email: string; code: string; newPassword: string }
    , callbacks: IConfirmPasswordCallback
) {
  const cognitoUser = new CognitoUser({
    Username: formData.email,
    Pool: userPool,
    Storage: cookieStorage,
  });

  cognitoUser.confirmPassword(formData.code, formData.newPassword, {
    onSuccess: function (data) {
      console.log('Successfully reset password');
      callbacks.onSuccess(formData.email)
    },
    onFailure: function (err) {
      callbacks.onFailure(err.message);
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

function convertSessionToUser(session: CognitoUserSession, withDetails: boolean, resolve: (value: (User)) => void, cognitoUser: CognitoUser, reject: (reason?: any) => void) {
  // Check if user is a Pro user, for that inside the cognito:groups it should contain the Pro element
  const isPro = session.getAccessToken().payload["cognito:groups"]?.includes("Pro");
  console.log("Is Pro: ", isPro);
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
    const email = result!.find((r) => r.getName() === "email")?.getValue();
    resolve({
      username: cognitoUser.getUsername(),
      accessToken: session.getAccessToken().getJwtToken(),
      email: email!,
      isPro: isPro
    });
    return;
  });
}

export function getCurrentUser(
  withDetails: boolean = false,
  refresh: boolean = false
): Promise<User> {
  return new Promise((resolve, reject) => {
    const cognitoUser = cognitoUserPool.getCurrentUser();

    if (cognitoUser === null) {
      reject(null);
      return;
    }

    cognitoUser.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
          return;
        }

        if (session === null || !session.isValid()) {
          reject(null);
          return;
        }

        if (refresh) {
          cognitoUser.refreshSession(
            session.getRefreshToken(),
            (err, refreshed_session) => {
              if (err) {
                reject(err);
                return;
              }

              convertSessionToUser(refreshed_session, withDetails, resolve, cognitoUser, reject);
            }
          );
          return; // no need to fetch details if we don't need them.
        } else {
          convertSessionToUser(session, withDetails, resolve, cognitoUser, reject);
        }
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
