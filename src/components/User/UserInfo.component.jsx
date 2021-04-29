import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import { SettingsContext } from "context/SettingsContext.js";
const UserInfoEdit = React.lazy(() => import('components/User/UserInfoEdit.component.jsx'));

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold"
    },
    content: {
        paddingTop: 2,
        whiteSpace: 'pre-line'
    },
}));

export default function UserInfo(props) {
    const { goodsCount } = props;
    const classes = useStyles();
    const { currentMemberContext, setCurrentMemberContext } = React.useContext(CurrentMemberContext);
    const { settingsContext } = React.useContext(SettingsContext);
    const [isEdit, setIsEdit] = React.useState(false);
    const [limitGoodsTooltipOpen, setLimitGoodsTooltipOpen] = React.useState(false);

    return (
        <>
            {currentMemberContext &&
                <>
                    {isEdit ?
                        <UserInfoEdit
                            currentMemberContext={currentMemberContext}
                            setCurrentMemberContext={setCurrentMemberContext}
                            setIsEdit={setIsEdit}
                        />
                        :
                        <>
                            <Box display="flex" my={2}>
                                <Typography
                                    variant="body1"
                                    component="h3"
                                    className={classes.title}
                                >暱稱：</Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    className={classes.content}
                                >{currentMemberContext.profile.name}</Typography>
                            </Box>
                            <Box display="flex" my={2}>
                                <Typography
                                    variant="body1"
                                    component="h3"
                                    className={classes.title}
                                >信箱：</Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    className={classes.content}
                                >{currentMemberContext.profile.email}</Typography>
                            </Box>
                            <Box display="flex" my={2}>
                                <Typography
                                    variant="body1"
                                    component="h3"
                                    className={classes.title}
                                >註冊日期：</Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    className={classes.content}
                                >
                                    {moment(currentMemberContext.registerDate).format('YYYY-MM-DD HH:mm:ss')}
                                </Typography>
                            </Box>
                            <Box display="flex" my={2}>
                                <Typography
                                    variant="body1"
                                    component="h3"
                                    className={classes.title}
                                >物品數：</Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                >{goodsCount} / {settingsContext.limitGoods}</Typography>
                                <Tooltip
                                    title="VIP資格可提高物品上限"
                                    style={{ margin: '1px 0 0 4px' }}
                                    open={limitGoodsTooltipOpen ? limitGoodsTooltipOpen : false}
                                    onClick={() => setLimitGoodsTooltipOpen(state => !state)}
                                    arrow={true}
                                ><InfoIcon fontSize="small" color="secondary" />
                                </Tooltip>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsEdit(true)}
                            >修改個人資訊</Button>
                        </>
                    }
                </>
            }
        </>
    );
}