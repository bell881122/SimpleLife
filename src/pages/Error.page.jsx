import React from 'react';
import { useHistory } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Error() {
    const history = useHistory();
    const [countDown, setCountDown] = React.useState(5);

    React.useEffect(() => {
        const timer = countDown > 0 && setInterval(() => setCountDown(countDown - 1), 1000);
        if (countDown === 0) {
            history.push("/")
        }
        return () => clearInterval(timer);
    }, [countDown, setCountDown, history])

    return (
        <Box my={5}>
            <Typography component="h1" style={{ display: 'none' }}>找不到對應的網頁</Typography>
            <Box mb={1}>
                <Typography variant="h2">?(˘•ω•˘)?</Typography>
            </Box>
            <Box mb={3}>
                <Typography variant="h4">指定的頁面好像失蹤了，請試試其他網址吧</Typography>
            </Box>
            <Typography variant="body1" color="error" >{countDown} 秒鐘後將自動跳轉至首頁</Typography>
        </Box>
    );
}