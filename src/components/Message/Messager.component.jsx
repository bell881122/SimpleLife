import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Grid from '@material-ui/core/Grid';

import MessageDataService, { NewMessage, getTimestamp } from "services/message.service";
const MessageShowCase = React.lazy(() => import('components/Message/MessageShowCase.component.jsx'));
const MessageList = React.lazy(() => import('components/Message/MessageList.component.jsx'));

export default function Messager(props) {
    const { currentMemberId, chatMemberId, setShowMessageCase } = props;
    const [message, setMessage] = React.useState();
    const [reQueryMessage, setReQueryMessage] = React.useState(0);
    const [toTop, setToTop] = React.useState(false);

    React.useEffect(() => {
        if (currentMemberId && chatMemberId) {
            let newMessage = NewMessage.data;
            newMessage.authorId = currentMemberId;
            newMessage.receiverId = chatMemberId;
            setMessage(newMessage);
        }
    }, [currentMemberId, chatMemberId]);

    const sendMessage = () => {
        let data = message;
        if (!data.content.length) {
            return;
        } else {
            data.timestamp = getTimestamp();
            MessageDataService.create(data)
                .then(function (docRef) {
                    setMessage(state => ({
                        ...state,
                        content: ""
                    }))
                    setReQueryMessage(state => state + 1);
                    setToTop(false);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    const onChange = (value) => {
        setMessage(state => ({
            ...state,
            content: value
        }))
    }

    const handleKeyPress = (event) => {
        let data = message;
        if (!data.content.trim().length || event.key !== 'Enter')
            return;
        else
            sendMessage();
    }

    return (
        <Box my={1}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={5}>
                    <MessageList />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <MessageShowCase
                        currentMemberId={currentMemberId}
                        chatMemberId={chatMemberId}
                        reQueryMessage={reQueryMessage}
                        toTop={toTop}
                        setToTop={setToTop}
                    />
                    <Box component="div" my={1}>
                        <form>
                            <FormControl fullWidth>
                                <Box display="flex">
                                    <Box mr={1} display="flex">
                                        <Button style={{ border: 'solid 1px gray', color: 'gray', fontSize: 12 }} onClick={() => setShowMessageCase(false)}>回上頁</Button>
                                    </Box>
                                    {message &&
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            id="standard-multiline-flexible"
                                            name="message"
                                            // label="新增訊息"
                                            value={message.content}
                                            placeholder="請輸入訊息"
                                            onChange={e => onChange(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                    }
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => sendMessage()}
                                    ><PlayArrowIcon /></Button>
                                </Box>
                            </FormControl>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}