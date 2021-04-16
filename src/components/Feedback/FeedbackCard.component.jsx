import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function FeedbackCard(props) {
    const { feedback } = props;
    const classes = useStyles();

    return (
        <>{feedback &&
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {feedback.title}
                    </Typography>
                    <Box mt={1} mb={2}>
                        <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-line' }}>
                            {feedback.content}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <Box>
                            <Typography className={classes.pos} color="textSecondary">
                                {feedback.type}-
                                <Typography component="span" color="primary">
                                    {feedback.state}
                                </Typography>
                            </Typography>
                        </Box>
                        <Box style={{ marginLeft: "auto" }}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {moment(feedback.registerTime).format('YYYY-MM-DD HH:mm:ss')}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        }</>
    );
}