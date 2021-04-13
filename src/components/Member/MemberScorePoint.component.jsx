import React from 'react';

import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { primaryColor, dangerColor } from "material-ui/custom.js";

import MemberDataService from "services/member.service";
const ModalBotton = React.lazy(() => import('tools/ModalBotton.tool.jsx'));

function Scorer(props) {
    const { point, setPoint } = props;
    const [location, setLocation] = React.useState(point);

    return (
        <Box mb={1}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>
                我的評分：{point}
            </Typography>
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexWrap="wrap">
                    {Array.from(Array(5).keys()).map(x => x - 5).map((lct, index) => (
                        <Box
                            key={index}
                            onMouseOver={() => setLocation(lct)}
                            onClick={() => { setPoint(lct); setLocation(lct) }}
                        >
                            {(location < (lct + 1)) && location < 0 ?
                                <StarIcon style={{ color: dangerColor }} /> :
                                < StarOutlineIcon style={{ color: dangerColor }} />
                            }
                        </Box>
                    ))}
                    < StarOutlineIcon
                        color="secondary"
                        onMouseOver={() => setLocation(0)}
                        onClick={() => { setPoint(0); setLocation(0) }}
                    />
                    {Array.from(Array(5).keys()).map(x => x + 1).map((lct, index) => (
                        <Box
                            key={index}
                            onMouseOver={() => setLocation(lct)}
                            onClick={() => { setPoint(lct); setLocation(lct) }}
                        >
                            {(location > (lct - 1)) && location > 0 ?
                                <StarIcon color="primary" /> :
                                < StarOutlineIcon color="primary" />
                            }
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default function MemberScorePoint(props) {
    const { member, setMember, currentMemberId } = props;
    const [point, setPoint] = React.useState(0);
    const [averagePoint, setAveragePoint] = React.useState((0).toFixed(1));

    React.useEffect(() => {
        if (member && member.scores && currentMemberId) {
            if (member.scores.some(x => x.memberId === currentMemberId)) {
                let index = -1;
                for (let i = 0; i < member.scores.length; i++) {
                    if (member.scores[i].memberId === currentMemberId)
                        index = i;
                }
                setPoint(member.scores[index].point);
            }
        }
        if (member.scores && member.scores.length > 0) {
            let totalScore = member.scores.reduce(function (previousValue, currentValue) {
                return previousValue.point + currentValue.point
            });
            setAveragePoint((totalScore / member.scores.length).toFixed(1));
        }
    }, [member, currentMemberId, setPoint]);

    const scoreMember = () => {
        let data = member;
        if (data.scores.some(x => x.memberId === currentMemberId)) {
            let index = -1;
            for (let i = 0; i < data.scores.length; i++) {
                if (data.scores[i].memberId === currentMemberId)
                    index = i;
            }
            data.scores[index].point = point;
        } else {
            data.scores.push({ memberId: currentMemberId, point: point })
        }
        MemberDataService.update(data.id, data)
            .then(function (docRef) {
                setMember(member);
            })
            .catch((e) => {
                console.log(e);
            });


    };

    return (
        <>
            <ModalBotton
                style={{
                    marginLeft: 5,
                    color: primaryColor,
                }}
                size="small"
                buttonText={<>
                    <StarIcon fontSize="small" style={{ margin: '0 2px 1px 0' }} />
                    <Typography variant="body1" component="h2">
                        {averagePoint}
                    </Typography>
                </>}
                modalTitle=""
                modalContentType="jsx"
                modalContent={<Scorer point={point} setPoint={setPoint} />}
                modalAction={() => scoreMember()}
                modalActionButtonColor={primaryColor}
                actionText="確認"
                disabled={currentMemberId === undefined}
            />
        </>
    );
}