import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const SearchDefault = React.lazy(() => import('components/Search/SearchDefault.component.jsx'));
const LoginButton = React.lazy(() => import('components/Login/LoginButton.component.jsx'));

let imgUrl = "https://cdn.stocksnap.io/img-thumbs/960w/bedroom-clean_OE0F9BHXJQ.jpg";

const useStyles = makeStyles((theme) => ({
    backGroundPic: {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: '0% 100%',
        left: 0,
        top: 0,
        opacity: 0.35,
        zIndex: -1
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <Box position="absolute" width={1} style={{ left: '0', top: '0' }}>
            <Box position="relative">
                <Box width={1} height={1} position="absolute" className={classes.backGroundPic}></Box>
                <Container position="absolute" maxWidth="md" style={{ height: '100%' }}>
                    <Box px={3} py={8} >
                        <Typography variant="h4" component="h2" color="primary" >
                            豐盈的第一步是變得更簡單
                        </Typography>
                        <Typography variant="h6" component="h3" color="primary" style={{ marginBottom: '48px' }}>
                            Simpler Life, Richer Life.
                          </Typography>
                        <Typography variant="body1" component="p" style={{ marginBottom: '12px', whiteSpace: 'pre-line', letterSpacing: '0.5px', lineHeight: '24px' }}>
                            {`重新找回和物品的關係
                            讓好物長壽、讓人生樂活`}
                        </Typography>
                        <LoginButton type="home" />
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="md" style={{ height: '100%' }} >
                <SearchDefault />
            </Container>
        </Box>
    );
}