import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

const MemberScorePoint = React.lazy(() => import('components/Member/MemberScorePoint.component.jsx'));
const Messager = React.lazy(() => import('components/Message/Messager.component.jsx'));

export default function MemberInfo(props) {
    const { member, currentMemberContext, setMember, type } = props;
    const [showMessageCase, setShowMessageCase] = React.useState(false);
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent={type === "member" ? "center" : "left"}
        >
            {type === "member" ?
                <>
                    <Avatar
                        alt={member.profile.name}
                        src={member.profile.photoURL}
                    />
                    <Box ml={1}>
                        <Typography variant="body1" component="h2">
                            {member.profile.name}
                        </Typography>
                    </Box>
                </>
                :
                <RouterLink
                    basename="/member"
                    to={`/member/${member.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <Box display="flex" flexShrink={0}>
                        <Avatar
                            src={member.profile.photoURL}
                            alt={member.profile.name}
                        />
                        <Typography variant="body1" component="h2" style={{ margin: 'auto 0px auto 8px' }}>
                            {member.profile.name}
                        </Typography>
                    </Box>
                </RouterLink>
            }
            <MemberScorePoint
                member={member}
                setMember={setMember}
                currentMemberId={currentMemberContext ? currentMemberContext.id : undefined}
            />
            <Box ml={type === "member" ? 0 : "auto"}>
                <IconButton aria-label="Messager" color="primary" onClick={() => setShowMessageCase(true)}>
                    <SmsOutlinedIcon />
                </IconButton>
            </Box>
            {(
                currentMemberContext &&
                currentMemberContext.id !== member.id
            ) &&
                <Messager
                    chatMemberId={member.id}
                    showMessageCase={showMessageCase}
                    setShowMessageCase={setShowMessageCase}
                    showMessage={false}
                />
            }
        </Box>
    );
}