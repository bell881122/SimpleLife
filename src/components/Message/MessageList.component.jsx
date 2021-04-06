import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import MessageItemDataService from "services/messageItem.service";

const useStyles = makeStyles((theme) => ({
    massageList: {
        backgroundColor: theme.palette.background.paper,
        height: '100%'
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    ellipsis: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

export default function MessageList(props) {
    const { currentMemberId, chatMemberId, setCurrentChatMemberId, setCurrentChatItem } = props;
    const classes = useStyles();
    const [messageItems, setMessageItems] = React.useState([]);
    const [doneCheckMessageItem, setDoneCheckMessageItem] = React.useState(false);

    // 檢查 member 頁面進入時，如果沒有 messageItem 則新增
    React.useEffect(() => {
        if (currentMemberId) {
            if (chatMemberId) {
                MessageItemDataService.checkMessageItem(currentMemberId, chatMemberId, setDoneCheckMessageItem);
            } else {
                setDoneCheckMessageItem(true);
            }
        }
    }, [currentMemberId, chatMemberId]);

    React.useEffect(() => {
        if (currentMemberId) {
            // 獲取當前使用者所有 messageItem
            if (doneCheckMessageItem) {
                MessageItemDataService.getMessageItems(currentMemberId, setMessageItems);
            }
        }
    }, [currentMemberId, doneCheckMessageItem]);

    React.useEffect(() => {
        if (currentMemberId) {
            // 將 currentMessageItem 參數傳至外層予 MessageInputArea 寫入資料使用
            if (doneCheckMessageItem && chatMemberId && messageItems) {
                let currentMessageItem;
                messageItems.forEach(item => {
                    if (item.memberIds.indexOf(chatMemberId) > -1) {
                        currentMessageItem = item;
                    }
                })
                setCurrentChatItem(currentMessageItem);
            }
        }
    }, [currentMemberId, chatMemberId, doneCheckMessageItem, messageItems, setCurrentChatItem]);

    const getCurrentChat = (memberIds, value) => {

        // 指定 currentChatMemberId
        let userIndex = memberIds.indexOf(currentMemberId);
        let chatMemberIndex = userIndex === 0 ? 1 : 0;
        setCurrentChatMemberId(memberIds[chatMemberIndex]);

        // 移除 unreadMemberId
        let messageItem = value;
        messageItem.unreadMemberId = "";
        setCurrentChatItem(messageItem);
        MessageItemDataService.update(messageItem.id, messageItem);
    }

    return (
        <Box className={classes.massageList}>
            <List>
                {messageItems && messageItems.map((value, index) =>
                    <div key={index}>
                        <ListItem dense onClick={() => getCurrentChat(value.memberIds, value)}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={value.chatMemberName ? value.chatMemberName : ""}
                                    src={value.chatMemberPhotoUrl ? value.chatMemberPhotoUrl : ""}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.ellipsis}
                                primary={<Typography
                                    variant="h6"
                                    style={{ fontWeight: value.unreadMemberId === currentMemberId ? "bold" : 0 }}
                                >{value.chatMemberName ? value.chatMemberName : ""}</Typography>}
                                secondary={<Typography
                                    variant="body1"
                                    style={{ fontWeight: value.unreadMemberId === currentMemberId ? "bold" : 0 }}
                                >{value.lastMessage ? value.lastMessage : ""}</Typography>}
                            />
                        </ListItem>
                        {(messageItems.length - 1 !== index) &&
                            <Divider variant="middle" light />
                        }
                    </div>
                )}
            </List>
        </Box >
    );
}