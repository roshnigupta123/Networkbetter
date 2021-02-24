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
                title: 'Call Log Example',
                message: 'Access your call logs',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CallLogs.loadAll().then((callLogs) => {
                //  console.log('callLogs',callLogs[2])
                dispatch(callLogsListSuccess(callLogs))
            });

        } else {
            // alert('Call Log permission denied');
            dispatch(callLogsListFailure())
        }
    }
}
