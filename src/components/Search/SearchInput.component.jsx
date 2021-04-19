import React from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default function SearchInput(props) {
    const { searchString } = props;
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [searchContent, setSearchContent] = React.useState(searchString ? searchString : "");

    const goSearch = () => {
        const searchPath = `/search/${searchContent}`;
        if (searchContent.trim() ==='' || location.pathname === searchPath) {
            return;
        }
        history.push(searchPath);
    }

    const handleKeyPress = (event) => {
        if (event.key !== 'Enter')
            return;
        else
            goSearch();
    }

    return (
        <Paper
            // component="form"
            className={classes.root}
        >
            <InputBase
                className={classes.input}
                placeholder="請用空白區分關鍵字"
                inputProps={{ 'aria-label': '搜尋物品' }}
                value={searchContent}
                onChange={e => setSearchContent(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
                onClick={() => goSearch()}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
