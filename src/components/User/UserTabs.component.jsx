import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const UserGoods = React.lazy(() => import('components/User/UserGoods.component.jsx'));
const UserInfo = React.lazy(() => import('components/User/UserInfo.component.jsx'));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '4px 4px 0px 0px / 4px 4px',
        flexGrow: 1,
    },
    tabs: {
        flexGrow: 1,
    }
}));

export default function UserTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const componentLists = [
        { title: "刊登", component: <UserGoods /> },
        { title: "收藏", component: <p>收藏功能正在施工中，請再稍等唷</p> },
        { title: "個人", component: <UserInfo /> },
    ];

    return (
        <Box bgcolor="background.paper" className={classes.root}>
            <Paper className={classes.tabs}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    {componentLists.map((component, index) => (
                        <Tab key={index} label={component.title} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Paper>
            {componentLists.map((component, index) => (
                <TabPanel value={value} index={index} key={index}>
                    {component.component}
                </TabPanel>
            ))}
        </Box>
    );
}
