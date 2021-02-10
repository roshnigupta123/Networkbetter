import { CallLogs_LIST_SUCCESS, CallLogs_LIST_REQUEST, CallLogs_LIST_FAILURE } from '../Constant';

const initialState = {
    loading: false,
    callLogs: [],
    error: ''
  }

  const CallLog_reducer = (state = initialState, action) => {
    switch (action.type) {
      case CallLogs_LIST_REQUEST:
        return {
          ...state,
          loading: true
        }
      case CallLogs_LIST_SUCCESS:
        return {
          loading: false,
          callLogs: action.payload,
          error: ''
        }
      case CallLogs_LIST_FAILURE:
        return {
          loading: false,
          callLogs: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default CallLog_reducer;