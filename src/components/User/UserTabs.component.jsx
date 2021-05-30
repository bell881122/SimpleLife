import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import GoodDataService from "services/good.service";
const UserGoods = React.lazy(() => import('components/User/UserGoods.component.jsx'));
const UserFavorites = React.lazy(() => import('components/User/UserFavorites.component.jsx'));
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
        borderRadius: '4px 4px 4px 4px / 4px 4px',
        flexGrow: 1,
    },
    tabs: {
        flexGrow: 1,
    }
}));

export default function UserTabs() {
    const { currentMemberContext } = React.useContext(CurrentMemberContext);
    const [userGoods, setUserGoods] = React.useState();
    const [userFavoriteGoods, setUserFavoriteGoods] = React.useState();
    const [goodsCount, setGoodsCount] = React.useState(0);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        if (currentMemberContext) {
            GoodDataService.query({
                where: [{ key: "memberId", operation: "==", condition: currentMemberContext.id }],
                orderby: ["registerTimestamp", "desc"],
            }, setUserGoods);
            GoodDataService.getByIds(currentMemberContext.favorites, setUserFavoriteGoods);
        }
    }, [currentMemberContext]);

    React.useEffect(() => {
        if (userGoods && userGoods.length > 0) {
            setGoodsCount(userGoods.length);
        }
    }, [userGoods, setGoodsCount]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const componentLists = [
        {
            title: "刊登",
            component: <UserGoods goods={userGoods} goodsCount={goodsCount} />
        },
        {
            title: "收藏",
            component: userFavoriteGoods && userFavoriteGoods.length > 0 ?
                <UserFavorites goods={userFavoriteGoods} /> :
                <p>還沒有任何收藏喔</p>
        },
        {
            title: "個人",
            component: <UserInfo goodsCount={goodsCount} />
        },
    ];

    return (
        <Box bgcolor="background.paper" className={classes.root} mb={3}>
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
