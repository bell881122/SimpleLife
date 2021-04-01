import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import FeedbackDataService from "services/feedback.service";
const FeedbackCard = React.lazy(() => import('components/Feedback/FeedbackCard.component.jsx'));
const FeedbackForm = React.lazy(() => import('components/Feedback/FeedbackForm.component.jsx'));

export default function Feedback() {
    const [feedbacks, setFeedbacks] = React.useState();

    React.useEffect(() => {
        FeedbackDataService.getAll(setFeedbacks);
    }, []);

    return (
        <>
            {feedbacks &&
                <Container maxWidth="sm">
                    <FeedbackForm />
                    {feedbacks.map((feedback, index) => (
                        <Box key={index} my={3}>
                            <FeedbackCard feedback={feedback} />
                        </Box>
                    ))}
                </Container>
            }
        </>
    );
}