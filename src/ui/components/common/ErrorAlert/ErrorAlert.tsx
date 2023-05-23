import {Alert, Dialog} from '@mantine/core';
import styles from './ErrorAlert.module.css';
import React from "react";


type ErrorAlertPropsType = {
    error: string
    closeCallback: () => void
}

export const ErrorAlert = React.memo((props: ErrorAlertPropsType) => {

    const {
        error,
        closeCallback,
    } = props

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