import { TokenByIdResults } from '@mintbase-js/data/api/tokenById/tokenById.types'

export interface ErrorObj {
  status: number;
  message: string;
  error: boolean;
}

interface RequestActions {
  type: ActionTypes;
  data?: TokenByIdResults | null;
  error?: null | ErrorObj;
}

export enum ActionTypes {
  REQUEST_STARTED = "REQUEST_STARTED",
  REQUEST_SUCCESSFUL = "REQUEST_SUCCESSFUL",
  REQUEST_FAILED = "REQUEST_FAILED",
}

interface RequestState {
  isLoading: boolean;
  error?: null | ErrorObj;
  data?: TokenByIdResults |  null;
}

export const reducer = (
  state: RequestState,
  action: RequestActions
): RequestState => {
  switch (action.type) {
    case ActionTypes.REQUEST_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.REQUEST_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data,
      };
    case ActionTypes.REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        data: null
      };

    default:
      return state;
  }
};
