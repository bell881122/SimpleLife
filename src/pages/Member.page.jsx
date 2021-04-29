import React from 'react';
import { useParams } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import IconButton from '@material-ui/core/IconButton';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";
import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));
const Messager = React.lazy(() => import('components/Message/Messager.component.jsx'));
const MemberScorePoint = React.lazy(() => import('components/Member/MemberScorePoint.component.jsx'));

export default function Member() {
    let { id } = useParams();
    const [member, setMember] = React.useState();
    const [goods, setGoods] = React.useState();
    const [showMessageCase, setShowMessageCase] = React.useState(false);
    const { currentMemberContext } = React.useContext(CurrentMemberContext);

    React.useEffect(() => {
        if (id !== undefined) {
            MemberDataService.getById(id, setMember);
        }
    }, [id]);

    React.useEffect(() => {
        if (member !== undefined) {
            GoodDataService.getMemberGoods(id, setGoods);
        }
    }, [member, id]);

    return (
        <>
            {(currentMemberContext && currentMemberContext.id !== id) &&
                <Messager
                    chatMemberId={id}
                    showMessageCase={showMessageCase}
                    setShowMessageCase={setShowMessageCase}
                    showMessage={false}
                />
            }
            { member &&
                <Box my={3}>
                    <Box display="flex" justifyContent="center">
                        <Box>
                            <Box display="flex" alignItems="center" justifyContent="center" pr={2}>
                                <Avatar alt={member.profile.name} src={member.profile.photoURL} size="small" />
                                <Box ml={1}>
                                    <Typography variant="body1" component="h2">
                                        {member.profile.name}
                                    </Typography>
                                </Box>
                                <MemberScorePoint
                                    member={member}
                                    setMember={setMember}
                                    currentMemberId={currentMemberContext ? currentMemberContext.id : undefined}
                                />
                                {(
                                    currentMemberContext &&
                                    currentMemberContext.id !== id
                                ) &&
                                    <IconButton aria-label="Messager" color="primary" onClick={() => setShowMessageCase(true)}>
                                        <SmsOutlinedIcon />
                                    </IconButton>
                                }
                            </Box>
                            <Box mt={1}>
                                <Typography variant="h6" component="p">
                                    {member.messageBoard}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <CardList goods={goods} />
                </Box>
            }
        </>
    );
}