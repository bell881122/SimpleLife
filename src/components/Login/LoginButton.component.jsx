import React from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { firebase } from "js/firebase";

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { primaryColor } from "material-ui/custom.js";

import { CurrentMemberContext } from "context/CurrentMemberContext.js";

export default function LoginButton(props) {
    const { type } = props;
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const { currentMemberContext } = React.useContext(CurrentMemberContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGoToUserPage = () => {
        history.push("/user");
    };

    const singUpPopupClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // var user = result.user;
                    console.log("Google 登入成功")
                });
            })
            .catch((error) => {
                console.log("Login Error:", error.code, error.message)
            });
    }

    return (
        <>
            {type === "home" ?
                <Button variant="outlined" color="primary"
                    onClick={currentMemberContext ? () => handleGoToUserPage() : () => handleClickOpen()}
                >馬上開始</Button>
                :
                <IconButton aria-label="Login" color="primary" onClick={() => handleClickOpen()}>
                    <Typography variant="button">
                        登入/註冊
                    </Typography>
                </IconButton>
            }
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">登入/註冊帳號</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "center", whiteSpace: 'pre-line' }}>
                        <Typography variant="body1" component="p" style={{ marginBottom: '12px', lineHeight: '24px' }}>
                            請詳閱本網站隱私權政策與授權條款，點選按鈕進行登入/註冊，即表示接受以下服務條款之所有內容。
                        </Typography>
                        <Typography variant="body1" component="p" style={{ fontSize: '18px', marginBottom: '32px' }} color="primary">
                            <RouterLink
                                basename="/privacy"
                                to="/privacy"
                                style={{ textDecoration: 'none', color: primaryColor }}
                                onClick={handleClose}
                            >
                                {`隱私權政策與授權條款`}
                            </RouterLink>
                        </Typography>
                        <Typography variant="body2" color="error" component="p" style={{ fontSize: '12px' }}>
                            {`※請使用瀏覽器開啟網頁登入，於LINE、Facebook等第三方App上開啟本網站，可能導致部分功能無法正常啟動。`}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={() => singUpPopupClick()}>
                        Google登入/註冊
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}