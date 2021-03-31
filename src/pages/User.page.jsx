import React from 'react';
import { useHistory } from 'react-router-dom';
import { firebase } from "js/firebase";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SmsIcon from '@material-ui/icons/Sms';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
const UserTabs = React.lazy(() => import('components/User/UserTabs.component.jsx'));
const Messager = React.lazy(() => import('components/Message/Messager.component.jsx'));

let imgUrl = "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(5, 0, 5),
    },
    backGroundPic: {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        top: 0,
        opacity: 0.35,
        zIndex: -1,
    },
    avatar: {
        width: theme.spacing(17),
        height: theme.spacing(17),
        marginBottom: theme.spacing(3)
    },
}));

export default function User() {
    const classes = useStyles();
    const [userPhoto, setUserPhoto] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");
    const [showMessageCase, setShowMessageCase] = React.useState(false);

    const history = useHistory();
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserPhoto(user.photoURL);
                setDisplayName(user.displayName);
            } else {
                history.push("/")
            }
        });
    }, [history]);

    const [currentMemberContext] = React.useContext(CurrentMemberContext);

    return (
        <>
            {(showMessageCase && currentMemberContext) ?
                <Messager
                    currentMemberId={currentMemberContext.uid}
                    setShowMessageCase={setShowMessageCase}
                /> :
                <>
                    { currentMemberContext &&
                        <>
                            <Box className={classes.heroContent} position="relative">
                                <Box position="absolute" width={1} height={1} className={classes.backGroundPic}></Box>
                                <Container maxWidth="sm">
                                    <Box display="flex" justifyContent="center">
                                        <Avatar alt={displayName} src={userPhoto} className={classes.avatar} />
                                    </Box>
                                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                        {currentMemberContext.profile.name}
                                        <Box component="span" ml={1}>
                                            <IconButton
                                                aria-label="Messager"
                                                color="primary"
                                                style={{ backgroundColor: '#ffffff' }}
                                                onClick={() => setShowMessageCase(true)}
                                            >
                                                <SmsIcon />
                                            </IconButton>
                                        </Box>
                                    </Typography>
                                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                        每天一點點，邁向簡單幸福生活。
                                    </Typography>
                                </Container>
                            </Box>
                            <UserTabs />
                        </>
                    }
                </>
            }
        </>
    );
}