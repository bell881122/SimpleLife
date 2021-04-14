import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { secondaryColor, dangerColor } from "material-ui/custom.js";

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import MemberDataService from "services/member.service";

const useStyles = makeStyles((theme) => ({
    favoriteButton: isMyFavorite => ({
        color: isMyFavorite ? dangerColor : secondaryColor,
        padding: 0,
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0)'
        },
    }),
}));

export default function FavoriteBotton(props) {
    const { goodId } = props;
    const { currentMemberContext, setCurrentMemberContext } = React.useContext(CurrentMemberContext);
    const [isMyFavorite, setIsMyFavorite] = React.useState(false);
    const classes = useStyles(isMyFavorite);

    React.useEffect(() => {
        if (currentMemberContext && currentMemberContext.favorites.indexOf(goodId) > -1) {
            setIsMyFavorite(true)
        }
    }, [currentMemberContext, goodId, setIsMyFavorite]);

    const changeFavorite = () => {

        let goodList = currentMemberContext.favorites;

        if (isMyFavorite) {
            if (goodList.indexOf(goodId) > -1) {
                goodList.splice(goodList.indexOf(goodId), 1);
            }
        } else {
            if (goodList.indexOf(goodId) < 0) {
                goodList.push(goodId);
            }
        }

        let member = currentMemberContext;
        member.favorites = goodList;
        MemberDataService.update(member.id, member)
            .then(() => {
                console.log("更新最愛成功");
            })
            .catch((e) => {
                console.log(e);
            });

        setCurrentMemberContext(member);
        setIsMyFavorite(state => !state)
    }

    return (
        <IconButton
            className={classes.favoriteButton}
            onClick={() => changeFavorite()}
            aria-label="favorite-button"
        >
            <LoyaltyIcon />
        </IconButton>
    );
}