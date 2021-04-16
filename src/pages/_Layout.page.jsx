import React from 'react';
import { firebase } from "js/firebase";
import { useLocation } from "react-router-dom";

import { ThemeProvider } from '@material-ui/styles';
import { theme } from "material-ui/custom.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";
const MenuBar = React.lazy(() => import('tools/MenuBar.tool.jsx'));

export default function Layout(props) {
    const location = useLocation();
    const [currentMemberContext, setCurrentMemberContext] = React.useState();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.uid) {
                //TODO:測試期間只開放部分註冊，測試結束後拿掉
                let testRegisteredValid = location.pathname === "/SimpleLifeTest" || user.uid === "9JgFvYBiXme9XzlRoUpJyLljzgg1";

                let currentMember = {
                    uid: user.uid,
                    profile: {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                }
                MemberDataService.getByUid(user.uid, currentMember, setCurrentMemberContext, testRegisteredValid);
            }
        });
    }, [location.pathname]);

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <CurrentMemberContext.Provider value={{ currentMemberContext, setCurrentMemberContext }}>
                    <Box display="flex" height="100vh" flexDirection="column" bgcolor="background.paper">
                        <Box flexShrink={1} >
                            <MenuBar />
                        </Box>
                        <Box height="100%" bgcolor="grey.100">
                            <Container maxWidth="md" style={{ height: '100%' }}>
                                {props.children}
                            </Container>
                        </Box>
                    </Box>
                </CurrentMemberContext.Provider>
            </ThemeProvider>
        </>
    );
}