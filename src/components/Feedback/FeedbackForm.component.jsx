import React from 'react';
import { useHistory } from "react-router-dom";
import getTimestamp from "js/getTimestamp.js";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import FeedbackDataService, { Feedback as NewFeedback } from "services/feedback.service";

const types = [
    {
        value: '建議',
        label: '建議',
    },
    {
        value: '報錯',
        label: '報錯',
    },
];

export default function FeedbackForm() {
    const history = useHistory();
    const [feedback, setFeedback] = React.useState(new NewFeedback("", "").data);
    const [submitButtomDisabled, setSubmitButtomDisabled] = React.useState(false);
    const { currentMemberContext } = React.useContext(CurrentMemberContext);

    const checkDisabled = React.useCallback(() => {
        const doCheckDisabled = async () => {
            if (feedback.title === "" ||
                feedback.content === "" ||
                feedback.type === ""
            ) {
                setSubmitButtomDisabled(true);
            } else {
                setSubmitButtomDisabled(false);
            }
        };

        doCheckDisabled();
    }, [feedback]);

    React.useEffect(() => {
        checkDisabled();
    }, [checkDisabled]);

    const onChange = (e, name) => {
        setFeedback(state => ({
            ...state,
            title: name === "title" ? e : feedback.title.trim(),
            content: name === "content" ? e : feedback.content.trim(),
            type: name === "type" ? e : feedback.type,
        }))
    }

    const commitFeedback = () => {
        let data = feedback;
        data.registerTime = Date.now();
        data.registerTimestamp = getTimestamp();
        data.memberId = currentMemberContext.uid;
        FeedbackDataService.create(data)
            .then(function (docRef) {
                history.go(0);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            {feedback && currentMemberContext &&
                <Box mx={2} mt={3} mb={6}>
                    <Box mb={2}>
                        <Typography variant="h5" component="h2">
                            系統錯誤回報／建議
                        </Typography>
                    </Box>
                    <form noValidate autoComplete="off">
                        <Box display="flex">

                            <Box mr={3} style={{ width: '100%' }}>
                                <TextField
                                    style={{ width: '100%' }}
                                    id="standard-basic"
                                    label="標題"
                                    InputLabelProps={{
                                        shrink: true,
                                        'aria-label': 'title'
                                    }}
                                    name="title"
                                    value={feedback.title}
                                    onChange={e => onChange(e.target.value, e.target.name)}
                                    onBlur={() => checkDisabled()}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="類型"
                                    name="type"
                                    value={feedback.type}
                                    onChange={e => onChange(e.target.value, e.target.name)}
                                >
                                    {types.map((option) => (
                                        <MenuItem key={option.value} value={option.value} style={{ width: '100%' }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box style={{ width: '100%' }}>
                                <TextField
                                    style={{ width: '100%' }}
                                    id="standard-multiline-static"
                                    label="回報內容"
                                    name="content"
                                    multiline
                                    rows={3}
                                    value={feedback.content}
                                    onChange={e => onChange(e.target.value, e.target.name)}
                                    onBlur={() => checkDisabled()}
                                />
                            </Box>
                            <Box ml={2} style={{ marginTop: "auto" }} >
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => commitFeedback()}
                                        disabled={submitButtomDisabled}
                                    >提交</Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            }
        </>
    );
}