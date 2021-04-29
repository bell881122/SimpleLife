import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SmsIcon from '@material-ui/icons/Sms';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import NotificationDataService from "services/notification.service";
const NotificationDialog = React.lazy(() => import('components/Notification/NotificationDialog.component.jsx'));

const useStyles = makeStyles((theme) => ({
    ellipsis: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
}));

export default function Notification() {
    const classes = useStyles();
    const { currentMemberContext } = React.useContext(CurrentMemberContext);
    const [notification, setNotification] = React.useState();
    const [openNotification, setOpenNotification] = React.useState(false);
    const [currentNotification, setCurrentNotification] = React.useState({ title: "", context: "" });
    const theme = useTheme();
    const dense = useMediaQuery(theme.breakpoints.down('xs'));

    React.useEffect(() => {
        if (currentMemberContext) {
            NotificationDataService.getCurrentMemberNotificationItem(currentMemberContext.id, setNotification)
        }
    }, [currentMemberContext]);

    const handleOpen = (title, context, index) => {
        setCurrentNotification({ title: title, context: context })
        setOpenNotification(true);
        let nt = notification
        nt.notifications[index].unread = false;
        setNotification(nt);
        NotificationDataService.update(nt.id, nt);
    }

    return (
        <Box py={1}>
            <NotificationDialog
                open={openNotification}
                setOpen={setOpenNotification}
                currentNotification={currentNotification}
            />
            <List dense={dense} style={{ backgroundColor: 'white' }}>
                {notification && notification.notifications.map((value, index) => (
                    <>
                        <ListItem key={index} onClick={() => handleOpen(value.title, value.context, index)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <SmsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                disableTypography
                                primary={<Typography
                                    variant={dense ? "body2" : "body1"}
                                    style={{ fontWeight: value.unread ? 'bold' : 'none' }}
                                >{value.title}</Typography>}
                                secondary={<Typography
                                    varient="button"
                                    style={{ fontWeight: value.unread ? 'bold' : 'none', fontSize: dense ? '12px' : '14px' }}
                                    className={classes.ellipsis}
                                >{value.context}</Typography>}
                            />
                        </ListItem>
                        {index !== notification.notifications.length - 1 &&
                            <Divider light={true} />
                        }
                    </>
                ))}
            </List>
        </Box >
    );
}