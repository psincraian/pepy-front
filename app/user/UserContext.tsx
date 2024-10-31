import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";
import { User } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth";

// Initial state for the user context
const initialUser: State = {
  user: null, error: null, loading: true, refreshUser: async () => {
  }
};
export const UserContext = createContext(initialUser);
const UserDispatchContext = createContext<React.Dispatch<UserActionPayload>>(() => {
});

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

// UserProvider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialUser);

  // Refresh function to get the latest user data and update state
  const refreshUser = async () => {
    dispatch({ type: UserAction.LOADING });
    try {
      const user = await getCurrentUser(true, true); // Pass refresh as true
      if (user) {
        dispatch({ type: UserAction.LOGIN_SUCCESS, user });
      } else {
        dispatch({ type: UserAction.LOGIN_FAILED, error: "Unknown" });
      }
    } catch (error) {
      dispatch({ type: UserAction.LOGIN_FAILED, error: error instanceof Error ? error.message : "An error occurred" });
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, refreshUser }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

// User actions enum
export enum UserAction {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOADING
}

// Define payload types for the reducer actions
type UserActionPayload =
  | { type: UserAction.LOGIN_SUCCESS; user: User }
  | { type: UserAction.LOGIN_FAILED; error: string }
  | { type: UserAction.LOGOUT }
  | { type: UserAction.LOADING };

// Define state type with an added refreshUser function
type State = {
  user: User | null;
  error: string | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

// Reducer to handle user state changes
function userReducer(state: State, action: UserActionPayload): State {
  switch (action.type) {
    case UserAction.LOGIN_SUCCESS:
      return { ...state, user: action.user, error: null, loading: false };
    case UserAction.LOGIN_FAILED:
      return { ...state, user: null, error: action.error, loading: false };
    case UserAction.LOGOUT:
      return { ...state, user: null, error: null, loading: false };
    case UserAction.LOADING:
      return { ...state, user: null, error: null, loading: true };
    default:
      throw new Error("Invalid action: " + action);
  }
}