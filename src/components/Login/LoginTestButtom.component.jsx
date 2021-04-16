import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function LoginTestButtom(props) {
    const { singUpPopupClick } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton aria-label="Login" color="inherit" onClick={() => handleClickOpen()}>
                <Typography variant="button" display="block" gutterBottom>
                    登入/註冊
                </Typography>
            </IconButton>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">登入帳號</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "center", whiteSpace: 'pre-line' }}>
                        <Typography variant="h5" component="p">
                            【測試帳號】
                        </Typography>
                        <Typography variant="body1" component="p">
                            {`帳號：simplelifetest1
                            密碼：SimpleLife_1111
                            
                            `}
                        </Typography>
                        <Typography variant="body2" color="error" component="p">
                            {`※如果無法切換帳號，可使用無痕視窗`}
                        </Typography>
                        {/* <Typography variant="h5" component="p" style={{ paddingTop: 20 }}>
                            【測試帳號2】
                        </Typography>
                        <Typography variant="body1" component="p">
                            {`帳號：simplelifetest2
                            密碼：SimpleLife_2222`}
                        </Typography> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={() => singUpPopupClick()}>
                       Google 登入/註冊
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}