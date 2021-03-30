import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import Grid from '@material-ui/core/Grid';

const MessageList = React.lazy(() => import('components/Message/MessageList.component.jsx'));
const MessageShowCase = React.lazy(() => import('components/Message/MessageShowCase.component.jsx'));
const MessageInputArea = React.lazy(() => import('components/Message/MessageInputArea.component.jsx'));

const useStyles = makeStyles((theme) => ({
    emptyMessageCase: {
        height: '70vh',
        [theme.breakpoints.up('xs')]: {
            height: '83vh',
        },
        backgroundColor: 'rgba(230,230,230,1)'
    },
}));

export default function Messager(props) {
    let classes = useStyles();
    const { currentMemberId, chatMemberId, setShowMessageCase } = props;
    const [reQueryMessage, setReQueryMessage] = React.useState(0);
    const [toTop, setToTop] = React.useState(false);
    const [currentChatMemberId, setCurrentChatMemberId] = React.useState(chatMemberId);
    const [currentChatItem, setCurrentChatItem] = React.useState();

    return (
        <Box my={1}>
            <Box mr={1} display="flex">
                <Button style={{ border: 'solid 1px gray', color: 'gray', fontSize: 12 }} onClick={() => setShowMessageCase(false)}>回上頁</Button>
            </Box>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={5}>
                    <MessageList
                        currentMemberId={currentMemberId}
                        chatMemberId={currentChatMemberId}
                        setCurrentChatMemberId={setCurrentChatMemberId}
                        setCurrentChatItem={setCurrentChatItem}
                    />
                </Grid>
                <Grid item xs={12} sm={7} >
                    {currentChatMemberId ?
                        <>
                            <MessageShowCase
                                currentMemberId={currentMemberId}
                                chatMemberId={currentChatMemberId}
                                reQueryMessage={reQueryMessage}
                                toTop={toTop}
                                setToTop={setToTop}
                            />
                            <MessageInputArea
                                currentMemberId={currentMemberId}
                                chatMemberId={currentChatMemberId}
                                setReQueryMessage={setReQueryMessage}
                                setToTop={setToTop}
                                currentChatItem={currentChatItem}
                            />
                        </>
                        :
                        <Box p={2} display="flex" justifyContent="center" alignItems="center" className={classes.emptyMessageCase}>
                            <SmsOutlinedIcon style={{ opacity: 0.2, fontSize: 150 }} />
                        </Box>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}