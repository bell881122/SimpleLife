import React from 'react';
import { useHistory } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MemberDataService from "services/member.service";

export default function UserInfoEdit(props) {
    const { currentMemberContext, setCurrentMemberContext, setIsEdit } = props
    const history = useHistory();
    const [editMember, setEditMember] = React.useState(currentMemberContext);
    const [submitButtomDisabled, setSubmitButtomDisabled] = React.useState(false);

    const checkDisabled = React.useCallback(() => {
        const doCheckDisabled = async () => {
            if (editMember.profile.name === "" ||
                editMember.profile.name.length > 30 ||
                editMember.messageBoard === ""
            ) {
                setSubmitButtomDisabled(true);
            } else {
                setSubmitButtomDisabled(false);
            }
        };

        if (editMember) {
            doCheckDisabled();
        }
    }, [editMember]);

    const onChange = (e, name) => {
        setEditMember(state => ({
            ...state,
            profile: {
                ...state.profile,
                name: name === "name" ? e : editMember.profile.name.trim(),
            },
            messageBoard: name === "messageBoard" ? e : editMember.messageBoard.trim(),
        }))
    }

    const updateMemebr = () => {
        let data = editMember;
        MemberDataService.update(data.id, data)
            .then(function (docRef) {
                setCurrentMemberContext(editMember);
                history.go(0);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            {editMember &&
                <Box mt={3} mb={6}>
                    <Box mb={2}>
                        <Typography variant="h5" component="h2">
                            個人資料
                        </Typography>
                    </Box>
                    <form noValidate autoComplete="off">

                        <Box mb={2} style={{ width: '100%' }}>
                            <TextField
                                style={{ width: '100%' }}
                                id="standard-basic"
                                label="暱稱"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'name'
                                }}
                                name="name"
                                value={editMember.profile.name}
                                onChange={e => onChange(e.target.value, e.target.name)}
                                onBlur={() => checkDisabled()}
                                error={editMember.profile.name.length > 30}
                                helperText={editMember.profile.name.length > 30 ? "暱稱設定不可超過30字" : ""}
                            />
                        </Box>
                        <Box mb={2} style={{ width: '100%' }}>
                            <TextField
                                style={{ width: '100%' }}
                                id="standard-basic"
                                label="留言板"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'messageBoard'
                                }}
                                name="messageBoard"
                                value={editMember.messageBoard}
                                onChange={e => onChange(e.target.value, e.target.name)}
                                onBlur={() => checkDisabled()}
                            />
                        </Box>
                        <Box style={{ marginTop: "auto" }} >
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => updateMemebr()}
                                    disabled={submitButtomDisabled}
                                >提交</Button>
                                <Button
                                    variant="contained"
                                    onClick={() => setIsEdit(false)}
                                    style={{ marginLeft: 10 }}
                                >取消</Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            }
        </>
    );
}