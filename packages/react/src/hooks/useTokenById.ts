import { useEffect, useReducer, useState } from "react";
import { tokenById } from "@mintbase-js/data";
import { ActionTypes, reducer } from "../utils/reducer";

export const useTokenById = (tokenId: string, contractAddress: string) => {
  const initialState = {
    isLoading: true,
    data: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    if (state.isLoading) {
      (async () => {
        dispatch({ data: null, type: ActionTypes.REQUEST_STARTED });

        const { data, error } = await tokenById(tokenId, contractAddress);

        if (error) {
          dispatch({ error: error, type: ActionTypes.REQUEST_FAILED });
        } else {
          if (data) {
            dispatch({
              data: data,
              type: ActionTypes.REQUEST_SUCCESSFUL,
            });
          }
        }
      })();

      return () => {
        isCancelled = true;
      };
    }
  }, []);

  const { data, isLoading, error } = state;

  return { data, isLoading, error };
};
