import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    ellipsis: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

export default function CardDetail(props) {
    const classes = useStyles();
    const { good } = props;

    return (
        <>
            {good &&
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={good.imgURL}
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="button" component="h2" className={classes.ellipsis} >
                            {good.title}
                        </Typography>
                        <Typography variant="h5" >
                            <Typography variant="body1" component="span">NT$</Typography>
                            {` ${good.price}`}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small" color="primary">
                            View
                        </Button>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                    </CardActions> */}
                </Card>
            }
        </>
    );
}