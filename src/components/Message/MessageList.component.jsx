import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

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

export default function MessageList() {
    const classes = useStyles();
    const messageList = ["A", "B", "C"];

    return (
        <Box className={classes.massageList}>
            <List>
                {messageList.map((value, index) =>
                    <div key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${value} 我是主標我是主標我是主標我是主標我是主標我是主標`}
                                secondary={"我是副標"}
                                className={classes.ellipsis}
                            />
                        </ListItem>
                        {messageList.length - 1 !== index &&
                            <Divider variant="middle" light />
                        }
                    </div>
                )}
            </List>
        </Box>
    );
}