import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    mainPicture: good => ({
        width: '100% !important',
        height: 300,
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
    description: {
        fontSize: 18,
        fontWeight: 'bold'
    }
}));

export default function GoodDetail(props) {
    const { good } = props;
    const classes = useStyles(good);

    return (
        <Box>
            {good &&
                <>
                    <Box mb={2} className={classes.mainPicture} />
                    <Box mx={1} my={3}>
                        <Box mb={1} display="flex" justifyContent="space-between">
                            <Chip label={good.state} size="small" />
                            <Typography variant="body1" display="block" gutterBottom>
                                刊登日：{moment(good.publishedDate).format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" component="h2" mb={5} className={classes.title}>
                                {good.title}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h4" component="h3">
                                ${good.price}
                            </Typography>
                        </Box>
                        <Divider light={true} />
                        <Box my={2}>
                            <Box my={1}>
                                <Typography variant="body1" component="h3" className={classes.description}>
                                    物品描述：
                                </Typography>
                            </Box>
                            <Typography variant="body1" component="p">
                                {good.description}
                            </Typography>
                        </Box>
                    </Box>
                </>
            }
        </Box>
    );
}