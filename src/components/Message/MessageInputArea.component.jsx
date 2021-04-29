import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import MessageDataService, { NewMessage } from "services/message.service";
import getTimestamp from "js/getTimestamp.js";
import MessageItemDataService from "services/messageItem.service";
import NotificationDataService, { NewNotification } from "services/notification.service";

export default function MessageInputArea(props) {
    const { currentMemberId, currentMemberName, chatMemberId, setReQueryMessage, setToTop, currentChatItem } = props;
    const [message, setMessage] = React.useState();

    React.useEffect(() => {
        if (currentMemberId && chatMemberId) {
            let newMessage = NewMessage.data;
            newMessage.authorId = currentMemberId;
            newMessage.receiverId = chatMemberId;
            setMessage(newMessage);
        }
    }, [currentMemberId, chatMemberId]);

    const sendMessage = () => {

        // 上傳 message
        let data = message;
        if (!data.content.length) {
            return;
        } else {
            data.createdTimestamp = getTimestamp();
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

        // 更新 messageItem
        let messageItem = currentChatItem;
        messageItem.lastMessage = message.content;
        messageItem.lastModifiedDate = Date.now();
        messageItem.lastModifiedTimestamp = getTimestamp();
        messageItem.unreadMemberId = chatMemberId;
        MessageItemDataService.update(messageItem.id, messageItem);

        //更新 notification
        let notification = NewNotification.data;
        notification.type = "msg";
        notification.title = `${currentMemberName} 傳送了訊息給您`;
        notification.context = "收到一封新訊息，可於個人頁面點擊查看。";
        notification.unread = true;
        notification.registerDate = Date.now();
        notification.registerTimestamp = getTimestamp();
        NotificationDataService.updateByMemberId(chatMemberId, notification)
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
        <Box component="div" my={1}>
            {/* <form> */}
            <FormControl fullWidth>
                <Box display="flex">
                    {message &&
                        <TextField
                            style={{ paddingLeft: 15 }}
                            fullWidth
                            // multiline
                            // rows={2}
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
            {/* </form> */}
        </Box>
    );
}