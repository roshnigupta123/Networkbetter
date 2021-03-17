import { CallLogs_LIST_SUCCESS, CallLogs_LIST_REQUEST, CallLogs_LIST_FAILURE } from '../Constant';
import CallLogs from 'react-native-call-log';
import { Platform, PermissionsAndroid } from 'react-native';

export const callLogsListRequest = () => {
    return {
        type: CallLogs_LIST_REQUEST
    }
}

export const callLogsListSuccess = callLogs => {
    return {
        type: CallLogs_LIST_SUCCESS,
        payload: callLogs
    }
}

export const callLogsListFailure = error => {
    return {
        type: CallLogs_LIST_FAILURE,
        payload: error
    }
}

export const permission_calls = () => {
    return async (dispatch) => {
        dispatch(callLogsListRequest())
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
                title: 'Access your call logs',
                message: 'Call log permission to understand when was the last time user spoke to the specific contact. Based on the last call time we customize our suggestions for possible connect.',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CallLogs.loadAll().then((callLogs) => {
                dispatch(callLogsListSuccess(callLogs))
            });

        } else {
            dispatch(callLogsListFailure())
        }
    }
}
