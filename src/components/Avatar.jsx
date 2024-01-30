import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '120px',
        marginRight: '20px',
        borderRadius: '4px'
    },
}));

function Avatar() {

    const classes = useStyles();

    return (
            <img className={classes.root} src="../Assets/Images/lomito.jpg" alt="" />
    )
}

export default Avatar