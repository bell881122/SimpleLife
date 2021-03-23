import React from 'react';
import { useParams } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import MemberDataService from "services/member.service";
import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));

export default function Member() {
    let { id } = useParams();
    const [member, setMember] = React.useState();
    const [goods, setGoods] = React.useState();

    React.useEffect(() => {
        if (id !== undefined) {
            MemberDataService.getById(id, null, setMember);
        }
    }, [id]);

    React.useEffect(() => {
        if (member !== undefined) {
            GoodDataService.query("memberId", "==", id, setGoods);
        }
    }, [member, id]);

    return (
        <>
            {member &&
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