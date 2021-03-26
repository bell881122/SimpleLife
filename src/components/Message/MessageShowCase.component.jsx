import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import MessageDataService from "services/message.service";

const useStyles = makeStyles((theme) => ({
    messageCase: {
        height: '70vh',
        [theme.breakpoints.up('xs')]: {
            height: '80vh',
        },
        overflowY: "scroll",
        backgroundColor: 'rgba(230,230,230,1)'
    },
    messageWidth: {
        maxWidth: '80%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '65%'
        },
        paddingLeft: 5,
        paddingRight: 5,
    },
}));

export default function MessageShowCase(props) {
    let classes = useStyles();
    const { currentMemberId, chatMemberId, reQueryMessage, toTop, setToTop } = props;
    const [messageLists, setmessageLists] = React.useState();
    const [queryLimit, setQueryLimit] = React.useState(10);
    const pinToBottomRef = React.useRef();

    React.useEffect(() => {
        MessageDataService.queryMessages(currentMemberId, chatMemberId, queryLimit, setmessageLists);
    }, [currentMemberId, chatMemberId, reQueryMessage, queryLimit]);

    React.useEffect(() => {

        if (pinToBottomRef && pinToBottomRef.current && pinToBottomRef.current.childNodes)
            pinToBottomRef.current.scrollTop = 20000;

        if (toTop)
            pinToBottomRef.current.scrollTop = 0;

    }, [pinToBottomRef, messageLists, toTop]);

    const getMoreMessage = () => {
        setQueryLimit(state => state + 10);
        setToTop(true);
    }

    return (
        <Box
            px={2}
            ref={pinToBottomRef}
            className={classes.messageCase}
        >
            <Box display="flex" justifyContent="center">
                <Box pt={1}>
                    <Badge badgeContent={"more"} color="primary" style={{ opacity: '0.75' }} onClick={() => getMoreMessage()} />
                </Box>
            </Box>
            {messageLists &&
                messageLists.map((value, index) => (
                    <Box mt={1} key={index}>
                        <Box display="flex">
                            <Paper
                                elevation={3}
                                className={classes.messageWidth}
                                style={{ backgroundColor: value.authorId === currentMemberId ? "" : "gray", }}
                            >
                                <Box p={1}>
                                    <Typography
                                        style={{ marginBottom: 0, wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                                        variant="body1"
                                        display="block" gutterBottom
                                    >
                                        {value.content}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Box>
                            <Typography variant="caption" display="block">
                                {
                                    moment(Date.now()).format('YYYY-MM-DD') !== moment(value.createdTime).format('YYYY-MM-DD') ?
                                        moment(value.createdTime).format('YYYY-MM-DD HH:mm:ss') :
                                        `今天 ${moment(value.createdTime).format('HH:mm:ss')}`
                                }
                            </Typography>
                        </Box>
                    </Box>
                ))
            }
        </Box >
    );
}