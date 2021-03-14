import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const MenuBar = React.lazy(() => import('tools/MenuBar.tool.jsx'));

export default function Layout(props) {

    return (
        <>
            <CssBaseline />
            <MenuBar />
            <Container maxWidth="md">
                <Box px={3}>
                    {props.children}
                </Box>
            </Container>
        </>
    );
}