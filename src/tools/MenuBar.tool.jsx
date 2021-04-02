import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MoreIcon from '@material-ui/icons/MoreVert';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import PersonIcon from '@material-ui/icons/Person';
import Container from '@material-ui/core/Container';

const LoginState = React.lazy(() => import('components/Login/LoginState.component.jsx'));

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        textDecoration: 'none',
        color: theme.palette.background.paper,
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
        },
        "& button,a": {
            padding: 8,
            [theme.breakpoints.up('sm')]: {
                padding: 12,
            },
        },
    },
    // sectionMobile: {
    //     display: 'flex',
    //     [theme.breakpoints.up('xs')]: {
    //         display: 'none',
    //     },
    // },
    desktopIconSize: {
        fontSize: '28px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '34px',
        },
    },
}));

export default function MenuBar() {
    const classes = useStyles();
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    // };

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    // const mobileMenuId = 'primary-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem component={RouterLink} to="/">
    //             <IconButton aria-label="Goods" color="inherit">
    //                 <CardGiftcardIcon />
    //             </IconButton>
    //             <p>Goods</p>
    //         </MenuItem>
    //         {/* <MenuItem component={RouterLink} to="/notification">
    //             <IconButton aria-label="Notifications" color="inherit">
    //                 <Badge badgeContent={11} color="secondary">
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem> */}
    //         <MenuItem component={RouterLink} to="/user">
    //             <LoginState desktopIconSize={classes.desktopIconSize} />
    //         </MenuItem>
    //     </Menu>
    // );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Container maxWidth="md">
                    <Toolbar px={0} mx={0}>
                        <Typography className={classes.title} variant="h6" noWrap component={RouterLink} to="/">
                            Simple Life
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="Goods" color="inherit" component={RouterLink} to="/">
                                <CardGiftcardIcon className={classes.desktopIconSize} />
                            </IconButton>
                            {/* <IconButton aria-label="Notifications" color="inherit" component={RouterLink} to="/notification">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon className={classes.desktopIconSize} />
                                </Badge>
                            </IconButton> */}
                            <LoginState desktopIconSize={classes.desktopIconSize} />
                        </div>
                        {/* <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div> */}
                    </Toolbar>
                </Container>
            </AppBar>
            {/* {renderMobileMenu} */}
        </div>
    );
}