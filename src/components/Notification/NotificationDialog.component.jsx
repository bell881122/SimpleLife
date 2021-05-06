import React from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function NotificationDialog(props) {
    const { open, setOpen, currentNotification } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            fullScreen={fullScreen}
            maxWidth="sm"
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                <Typography variant="h5" component="p">
                    {currentNotification.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {moment(currentNotification.registerDate).format('YYYY-MM-DD HH:mm:ss')}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-line' }}>
                        {currentNotification.context}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
}