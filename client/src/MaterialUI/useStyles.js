import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    form_root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    },
}));

