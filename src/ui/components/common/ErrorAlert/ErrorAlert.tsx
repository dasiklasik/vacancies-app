import {Alert, Dialog} from '@mantine/core';
import styles from './ErrorAlert.module.css';
import React from "react";
import {setError} from "../../../../bll/app/app-reducer";
import { useAppDispatch } from '../../../../bll/store';


type ErrorAlertPropsType = {
    error: string
}

export const ErrorAlert = React.memo((props: ErrorAlertPropsType) => {

    const {error} = props

    const dispatch = useAppDispatch()

    const closeCallback = () => {
        dispatch(setError(null))
    }

    return (
        <Dialog
            position={{bottom: "20px", left: "20px"}}
            opened={!!error}
            p={0}>
            <Alert onClose={closeCallback} withCloseButton className={styles.alert} color="red">
                {error}
            </Alert>
        </Dialog>
    )
})