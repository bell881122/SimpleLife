import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

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
    const { currentMemberId, chatMemberId, setCurrentChatMemberId } = props;
    const classes = useStyles();
    const [messageItems, setMessageItems] = React.useState();
    const [doneCheckMessageItem, setDoneCheckMessageItem] = React.useState(false);

    React.useEffect(() => {
        if (currentMemberId) {
            if (chatMemberId) {
                MessageItemDataService.checkMessageItem(currentMemberId, chatMemberId, setDoneCheckMessageItem)
            } else {
                setDoneCheckMessageItem(true);
            }

            if (doneCheckMessageItem) {
                MessageItemDataService.getMessageItems(currentMemberId, setMessageItems);
            }
        }
    }, [currentMemberId, chatMemberId, doneCheckMessageItem]);

    const getChatMemberId = (memberIds) => {
        let userIndex = memberIds.indexOf(currentMemberId);
        let chatMemberIndex = userIndex === 0 ? 1 : 0;
        setCurrentChatMemberId(memberIds[chatMemberIndex]);
    }

    return (
        <Box className={classes.massageList}>
            <List>
                {messageItems && messageItems.map((value, index) =>
                    <div key={index}>
                        <ListItem onClick={() => getChatMemberId(value.memberIds)}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.memberIds[0]}
                                secondary={value.memberIds[1]}
                                className={classes.ellipsis}
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