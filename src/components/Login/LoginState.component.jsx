import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { firebase } from "js/firebase";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

export default function LoginState(props) {
    const classes = useStyles();
    const { desktopIconSize } = props

    const [isLogged, setIsLogged] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true);
                setCurrentUser(user);
            } else {
                setIsLogged(false);
                setCurrentUser(null);
            }
        });
    }

    const singUpPopupClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    var user = result.user;
                    console.log("Google 登入成功！", user)
                });
            })
            .catch((error) => {
                console.log("Login Error:", error.code, error.message)
            });
    }

    const history = useHistory();
    const signOutClick = () => {
        firebase.auth().signOut().then(function () {
            console.log("已成功登出！")
            history.go(0);
        })
    }

    return (
        <div>
            {isLogged && currentUser ?
                <>
                    <IconButton aria-label="User" color="inherit" component={RouterLink} to="/user">
                        <Avatar display="block" alt={currentUser.displayName} src={currentUser.photoURL} className={classes.avatar} />
                    </IconButton>
                    <IconButton aria-label="Logout" color="inherit" onClick={() => signOutClick()}>
                        <ExitToAppIcon className={desktopIconSize} />
                    </IconButton>
                </> :
                <IconButton aria-label="Login" color="inherit" onClick={() => singUpPopupClick()}>
                    <Typography variant="button" display="block" gutterBottom>
                        登入/註冊
                    </Typography>
                </IconButton>
            }
        </div>
    );
}