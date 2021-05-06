import React from 'react';
import { useParams } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";
import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));
const MemberInfo = React.lazy(() => import('components/Member/MemberInfo.component.jsx'));

export default function Member() {
    let { id } = useParams();
    const [member, setMember] = React.useState();
    const [goods, setGoods] = React.useState();
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
            { member &&
                <Box my={3}>
                    <Box display="flex" justifyContent="center">
                        <Box>
                            <MemberInfo
                                member={member}
                                currentMemberContext={currentMemberContext}
                                setMember={setMember}
                                type="member"
                            />
                            <Box mt={1}>
                                <Typography variant="body1" component="p" style={{ lineHeight: '2' }}>
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