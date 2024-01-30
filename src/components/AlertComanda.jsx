import { Alert, AlertTitle } from '@material-ui/lab';

function AlertComanda({sev, tit, desc}) {
    return (
            <Alert severity={sev}>
                <AlertTitle>{tit}</AlertTitle>
                {desc}
            </Alert>
    )
}

export default AlertComanda