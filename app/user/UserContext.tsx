import { createContext } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import React from "react";
import { User } from "@/app/user/helper/auth";
import { getCurrentUser } from "@/app/user/helper/auth";

const initialUser: State = { user: null, error: null, loading: true };
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
    dispatch({ type: UserAction.LOADING });
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
  LOADING
}

type UserActionPayload = {
  type: UserAction.LOGIN_SUCCESS,
  user: User
} | {
  type: UserAction.LOGIN_FAILED,
  error: string
} | {
  type: UserAction.LOGOUT,
} | {
  type: UserAction.LOADING
};

type State = {
  user: User | null,
  error: null | string,
  loading: boolean
}


function userReducer(state: State, action: UserActionPayload): State {
  switch (action.type) {
    case UserAction.LOGIN_SUCCESS:
      return { user: action.user, error: null, loading: false };
    case UserAction.LOGIN_FAILED:
      return { user: null, error: action.error, loading: false };
    case UserAction.LOGOUT:
      return { user: null, error: null, loading: false };
    case UserAction.LOADING:
      return { user: null, error: null, loading: true };
    default:
      throw new Error("Invalid action: " + action);
  }
}

