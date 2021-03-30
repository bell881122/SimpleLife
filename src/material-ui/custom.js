import { createMuiTheme } from '@material-ui/core/styles';
import { teal, grey, red } from '@material-ui/core/colors';

export const primaryColor = teal[400];
export const secondaryColor = grey[400];
export const dangerColor = red[400];

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor
        },
        danger: {
            main: dangerColor,
        },
    },
});