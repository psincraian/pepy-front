import { createContext } from "react";
import { User } from "@/app/user/helper/auth";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "@/app/user/helper/auth";
import React from "react";

const initialUser: State = { user: null, error: null };
export const UserContext = createContext(initialUser);
const UserDispatchContext = createContext<React.Dispatch<UserActionPayload>>(
  () => {},
)

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

// @ts-ignore
export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUser
  );

  useEffect(() => {
    getCurrentUser(true)
      .then((user) => {
        if (user !== null) {
          dispatch({
            type: UserAction.LOGIN_SUCCESS,
            user: user
          });
        } else {
          dispatch({ type: UserAction.LOGIN_FAILED, error: "Unknown" });
        }
      }).catch(error => {
        dispatch({type: UserAction.LOGIN_FAILED, error: error});
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export enum UserAction {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
}

type UserActionPayload = {
  type: UserAction.LOGIN_SUCCESS,
  user: User
} | {
  type: UserAction.LOGIN_FAILED,
  error: string
} | {
  type: UserAction.LOGOUT,
};

type State = {
  user: User | null,
  error: null | string
}


function userReducer(state: State, action: UserActionPayload): State {
  switch (action.type) {
    case UserAction.LOGIN_SUCCESS:
      console.log("Test")
      return { user: action.user, error: null };
    case UserAction.LOGIN_FAILED:
      return { user: null, error: action.error };
    case UserAction.LOGOUT:
      return { user: null, error: null };
    default:
      throw new Error("Invalid action: " + action);
  }
}

