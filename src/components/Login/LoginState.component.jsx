import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { firebase } from "js/firebase";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LoginButtom = React.lazy(() => import('components/Login/LoginButtom.component.jsx'));

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '28px',
        height:'28px',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    }
}));

export default function LoginState(props) {
    const classes = useStyles();
    const { desktopIconSize, isLogged, setIsLogged } = props
    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true);
                setCurrentUser(user);
            } else {
                setIsLogged(false);
                setCurrentUser(null);
            }
        });
    }, [setIsLogged, setCurrentUser]);

    const singUpPopupClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // var user = result.user;
                    console.log("Google 登入成功")
                });
            })
            .catch((error) => {
                console.log("Login Error:", error.code, error.message)
            });
    }

    const history = useHistory();
    const signOutClick = () => {
        firebase.auth().signOut().then(function () {
            console.log("已成功登出")
            history.go(0);
        })
    }

    return (
        <>
            {isLogged && currentUser ?
                <>
                    <IconButton aria-label="User" color="inherit" component={RouterLink} to="/user">
                        <Avatar display="block" alt={currentUser.displayName} src={currentUser.photoURL} className={classes.avatar} />
                    </IconButton>
                    <IconButton aria-label="Logout" color="inherit" onClick={() => signOutClick()}>
                        <ExitToAppIcon className={desktopIconSize} />
                    </IconButton>
                </> : <LoginButtom singUpPopupClick={singUpPopupClick} />
            }
        </>
    );
}