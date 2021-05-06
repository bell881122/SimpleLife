import React from 'react';
import { firebase } from "js/firebase";

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "material-ui/custom.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import { SettingsContext, Settings } from "context/SettingsContext.js";
import MemberDataService from "services/member.service";
const MenuBar = React.lazy(() => import('tools/MenuBar.tool.jsx'));

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(8)
        },
    },
}));

export default function Layout(props) {
    const [currentMemberContext, setCurrentMemberContext] = React.useState();
    const [settingsContext, setSettingsContext] = React.useState(Settings);
    const classes = useStyles();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.uid) {
                let currentMember = {
                    uid: user.uid,
                    profile: {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                }
                MemberDataService.getByUid(user.uid, currentMember, setCurrentMemberContext);
            }
        });
    }, []);

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <CurrentMemberContext.Provider value={{ currentMemberContext, setCurrentMemberContext }}>
                <SettingsContext.Provider value={{ settingsContext, setSettingsContext }}>
                    <Box display="flex" minHeight="100vh" flexDirection="column" bgcolor="grey.100">
                        <Box flexShrink={1} >
                            <MenuBar />
                        </Box>
                        <Box height="100%" className={classes.main}>
                            <Container maxWidth="md" style={{ height: '100%' }}>
                                {props.children}
                            </Container>
                        </Box>
                    </Box>
                </SettingsContext.Provider>
                </CurrentMemberContext.Provider>
            </ThemeProvider>
        </>
    );
}