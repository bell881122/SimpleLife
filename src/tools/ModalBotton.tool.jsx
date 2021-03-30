import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { dangerColor } from "material-ui/custom.js";

export default function ModalBotton(props) {
    const {
        variant,
        style,
        buttonText,
        modalTitle,
        modalContent,
        modalAction,
        actionText
    } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant={variant}
                style={style}
                onClick={handleClickOpen}
            >{buttonText}</Button>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={modalAction}
                        style={{
                            color: 'white',
                            backgroundColor: dangerColor
                        }}
                    >{actionText}</Button>
                    <Button onClick={handleClose} autoFocus>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
