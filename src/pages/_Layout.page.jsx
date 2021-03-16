import React from 'react';
import { firebase } from "js/firebase";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";
const MenuBar = React.lazy(() => import('tools/MenuBar.tool.jsx'));

export default function Layout(props) {

    const [currentMemberContext, setCurrentMemberContext] = React.useState();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.uid) {
                let currentMember ={
                    uid: user.uid,
                    profile: {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                }
                MemberDataService.getById(user.uid,currentMember, setCurrentMemberContext);
                }
            });
    }, []);

    return (
        <>
            <CssBaseline />
            <MenuBar />
            <CurrentMemberContext.Provider value={[currentMemberContext, setCurrentMemberContext]}>
                <Container maxWidth="md">
                    <Box px={3}>
                        {props.children}
                    </Box>
                </Container>
            </CurrentMemberContext.Provider>
        </>
    );
}