import { STATUS_CODES } from "../../Config";
import {
  LOGIN,
  SUCCESS,
  LOGOUT,
  REQUEST,
  REGISTER,
  FAIL,
  // COMPLETE_PROFILE,
} from "./actionTypes";
import { toast } from "react-toastify";
import { login, logout, register } from "../../Apis";

export const handleLogin = (payload) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN[REQUEST],
    });
    login(payload)
      .then((res) => {
        if (res?.statusCode === STATUS_CODES.SUCCESS) {
          toast.success("Login successful!");
          window.localStorage.setItem("userId", res.data._id);
          dispatch({
            type: LOGIN[SUCCESS],
            data: res?.data,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN[FAIL],
        });
      });
  };
};

export const handleLogout = (auto) => {
  return (dispatch) => {
    if (auto) {
      dispatch({
        type: LOGOUT[SUCCESS],
      });
    } else {
      logout()
        .then((res) => {
          if (res?.statusCode === STATUS_CODES.SUCCESS) {
            toast.success("Logout successful!");
            window.localStorage.removeItem('userId');
            dispatch({
              type: LOGOUT[SUCCESS],
            });
          }
        })
        .catch((err) =>
          dispatch({
            type: LOGOUT[FAIL],
          })
        );
    }
  };
};

export const handleRegister = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER[REQUEST],
    });
    register(payload)
      .then(({ statusCode, data }) => {
        if (statusCode === STATUS_CODES.SUCCESS) {
          toast.success("Account created successfully!");
          window.localStorage.setItem("userId", data._id);
          dispatch({
            type: REGISTER[SUCCESS],
            data,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER[FAIL],
        });
      });
  };
};

export const completeProfile = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN[SUCCESS],
      data,
    });
  };
};
