import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";
const FavoriteBotton = React.lazy(() => import('tools/FavoriteBotton.tool.jsx'));
const MemberInfo = React.lazy(() => import('components/Member/MemberInfo.component.jsx'));
const Messager = React.lazy(() => import('components/Message/Messager.component.jsx'));
const LoginButton = React.lazy(() => import('components/Login/LoginButton.component.jsx'));

const useStyles = makeStyles((theme) => ({
    mainPicture: good => ({
        width: '100% !important',
        // height: 300,
        paddingBottom: '100%',
        backgroundImage: good.imgURL !== undefined ? `url(${good.imgURL})` : "",
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        [theme.breakpoints.up('sm')]: {
            height: 450,
        },
        [theme.breakpoints.up('md')]: {
            height: 550,
        },
    }),
    title: {
        textAlign: 'justify',
        textJustify: 'inter-ideograph'
    },
    textWeight: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textDecorationNone: {
        textDecoration: 'none',
    },
    whiteBackground: {
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function GoodDetail(props) {
    const { good } = props;
    const classes = useStyles(good);
    const [goodMember, setGoodMember] = React.useState();
    const { currentMemberContext } = React.useContext(CurrentMemberContext);
    const [showMessageCase, setShowMessageCase] = React.useState(false);

    React.useEffect(() => {
        if (good !== undefined && good.memberId !== undefined) {
            MemberDataService.getById(good.memberId, setGoodMember);
        }
    }, [good]);

    return (
        <Box mb={2}>
            {good &&
                <>
                    <Box className={classes.mainPicture} />
                    {goodMember &&
                        <Box p={1} my={1} className={classes.whiteBackground}>
                            <MemberInfo
                                member={goodMember}
                                currentMemberContext={currentMemberContext}
                                setMember={setGoodMember}
                            />
                        </Box>
                    }
                    <Box mb={2} p={2} className={classes.whiteBackground}>
                        <Box mb={1} display="flex" flexWrap="wrap" justifyContent="space-between">
                            <Box display="flex">
                                <Box >
                                    <Chip label={good.state} size="small" />
                                </Box>
                                <Box ml={1} >
                                    <FavoriteBotton goodId={good.id} />
                                </Box>
                            </Box>
                            <Box style={{ marginTop: 3 }} >
                                <Typography variant="body2" display="block" gutterBottom>
                                    刊登日：{moment(good.publishedDate).format('YYYY-MM-DD')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" mb={5} className={classes.title}>
                                {good.title}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h4" component="h3">
                                <Typography variant="h6" component="span">NT$</Typography>
                                {` ${good.price}`}
                            </Typography>
                        </Box>
                        {good.location !== "" &&
                            <>
                                <Divider light={true} />
                                <Box my={2}>
                                    <Box my={1}>
                                        <Typography variant="body1" component="h3" className={classes.textWeight}>
                                            物品所在地：
                                    </Typography>
                                    </Box>
                                    <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-line' }}>
                                        {good.location}
                                    </Typography>
                                </Box>
                            </>
                        }
                        <Divider light={true} />
                        <Box my={2}>
                            <Box my={1}>
                                <Typography variant="body1" component="h3" className={classes.textWeight}>
                                    物品描述：
                                </Typography>
                            </Box>
                            <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-line' }}>
                                {good.description}
                            </Typography>
                        </Box>
                        {(good.tags && good.tags.length > 0) &&
                            <>
                                <Divider light={true} />
                                <Box my={2}>
                                    <Box my={1}>
                                        <Typography variant="body1" component="h3" className={classes.textWeight}>
                                            物品標籤：
                                        </Typography>
                                    </Box>
                                    <Box display="flex" flexWrap="wrap" w={1}>
                                        {good.tags && good.tags.map((tag, index) => (
                                            <Box key={index} mr={1} mb={1}>
                                                <RouterLink
                                                    basename="/search"
                                                    to={`/search/${tag}`}
                                                    className={classes.textDecorationNone}
                                                >
                                                    <Chip size="small" variant="outlined" label={tag} color="primary" onClick={() => { return }} />
                                                </RouterLink>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </>
                        }
                        <Divider light={true} />
                        <Box my={2}>
                            {(
                                currentMemberContext &&
                                currentMemberContext.id !== good.memberId
                            ) ?
                                <Box>
                                    <Button variant="contained" color="primary" size="large"
                                        onClick={() => setShowMessageCase(true)}
                                    >索取物品</Button>
                                    <Messager
                                        chatMemberId={good.memberId}
                                        showMessageCase={showMessageCase}
                                        setShowMessageCase={setShowMessageCase}
                                        showMessage={false}
                                    />
                                </Box>
                                : <Box>
                                    <LoginButton type="change" />
                                </Box>
                            }
                        </Box>
                    </Box>
                </>
            }
        </Box>
    );
}