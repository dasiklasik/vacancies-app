import {Alert, Dialog} from '@mantine/core';
import styles from './ErrorAlert.module.css'


type ErrorAlertPropsType = {
    error: string
    closeCallback: () => void
}

export const ErrorAlert = (props: ErrorAlertPropsType) => {

    const {
        error,
        closeCallback,
    } = props

    return (
        <Dialog
            position={{bottom: "20px", left: "20px"}}
            opened={!!error}
            p={0}>
            <Alert onClose={closeCallback} withCloseButton className={styles.alert} color={'red'}>
                {error}
            </Alert>
        </Dialog>
    )
}