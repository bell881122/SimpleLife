import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const MessageList = React.lazy(() => import('components/Message/MessageList.component.jsx'));
const MessageShowCase = React.lazy(() => import('components/Message/MessageShowCase.component.jsx'));
const MessageInputArea = React.lazy(() => import('components/Message/MessageInputArea.component.jsx'));

const useStyles = makeStyles((theme) => ({
    messagerBase: {
        position: "fixed",
        left: 0,
        bottom: 0,
        zIndex: 10,
        width: '100%',
        height: "90%",
        [theme.breakpoints.up('sm')]: {
            height: "60%",
        },
    },
    messageListOuter: {
        display: 'flex',
        backgroundColor: 'rgba(250,250,250,1)',
        maxWidth: '100%',
        height: '100%',
        overflowY: "auto",
        position: 'absolute',
        zIndex: 2,
        [theme.breakpoints.up('sm')]: {
            width: '45%',
            position: 'relative',
        },
    },
    messageListInner: {
        width: '100%',
        overflowX: "hidden",
    },
    messageContext: {
        paddingLeft: '5%',
        width: '100%',
        height: '100%',
        overflowY: "auto",
        backgroundColor: 'rgba(230,230,230,1)',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 0,
            width: '55%',
        },
    },
    messageInputArea: {
        height: '12%',
        width: "100%",
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white'
    },
    showMessageListBtn: {
        zIndex: 11,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
}));

export default function Messager(props) {
    let classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { currentMemberId, chatMemberId, showMessageCase, setShowMessageCase, showMessage } = props;
    const [reQueryMessage, setReQueryMessage] = React.useState(0);
    const [toTop, setToTop] = React.useState(false);
    const [currentChatMemberId, setCurrentChatMemberId] = React.useState(chatMemberId);
    const [currentChatItem, setCurrentChatItem] = React.useState();
    const [showMessageList, setShowMessageList] = React.useState(showMessage);

    return (
        <Slide direction="up" in={showMessageCase}>
            <Box className={classes.messagerBase}>
                <Container maxWidth="md"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: '100%',
                        overflowY: "auto",
                    }}>
                    <Box
                        display="flex"
                        flexShrink={0}
                        bgcolor='LightSeaGreen'
                        style={{ borderRadius: '4px 4px 0px 0px / 4px 4px', }}>
                        <Box m={1}>
                            <Typography variant="h6" component="h2" style={{ color: 'white' }}>
                                我的訊息
                            </Typography>
                        </Box>
                        <Box ml="auto">
                            <IconButton aria-label="User" onClick={() => setShowMessageCase(false)} >
                                <CancelIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    {showMessageCase &&
                        <Box display="flex"
                            flexShrink={1}
                            flexDirection="row"
                            style={{
                                height: '100%',
                                position: 'relative',
                                overflowY: "auto",
                            }}>
                            <Box className={classes.messageListOuter}>
                                <Box
                                    className={classes.messageListInner}
                                    style={{ width: (showMessageList || matches) ? '100%' : '0' }}>
                                    <MessageList
                                        currentMemberId={currentMemberId}
                                        chatMemberId={currentChatMemberId}
                                        setCurrentChatMemberId={setCurrentChatMemberId}
                                        setCurrentChatItem={setCurrentChatItem}
                                        setShowMessageList={setShowMessageList}
                                    />
                                </Box>
                                <Box className={classes.showMessageListBtn}>
                                    {[
                                        { show: false, icon: <ArrowBackIosIcon color="secondary" /> },
                                        { show: true, icon: <ArrowForwardIosIcon color="secondary" /> },
                                    ].map((item, index) => (
                                        <Box
                                            key={index}
                                            style={{
                                                height: '100%',
                                                display: (index === 0 && showMessageList) || (index === 1 && !showMessageList) ? 'flex' : 'none',
                                                alignItems: 'center',
                                                backgroundColor: 'white'
                                            }}
                                            onClick={() => setShowMessageList(item.show)}
                                        >{item.icon}</Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box className={classes.messageContext}>
                                {currentChatMemberId ?
                                    <Box style={{
                                        overflowY: "hidden",
                                        height: '100%',
                                        position: 'relative',
                                    }}>
                                        <Box height="88%">
                                            <MessageShowCase
                                                currentMemberId={currentMemberId}
                                                chatMemberId={currentChatMemberId}
                                                reQueryMessage={reQueryMessage}
                                                toTop={toTop}
                                                setToTop={setToTop}
                                            />
                                        </Box>
                                        <Box className={classes.messageInputArea} >
                                            <MessageInputArea
                                                currentMemberId={currentMemberId}
                                                chatMemberId={currentChatMemberId}
                                                setReQueryMessage={setReQueryMessage}
                                                setToTop={setToTop}
                                                currentChatItem={currentChatItem}
                                            />
                                        </Box>
                                    </Box>
                                    :
                                    <Box p={2} display="flex" justifyContent="center" alignItems="center">
                                        <SmsOutlinedIcon style={{ opacity: 0.2, fontSize: 150 }} />
                                    </Box>
                                }
                            </Box>
                        </Box>
                    }
                </Container>
            </Box>
        </Slide >
    );
}