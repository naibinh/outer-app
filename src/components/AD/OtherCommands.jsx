import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    card: {
        borderColor: theme.palette.primary[500],
        display: "inline-block",
        marginRight: theme.spacing(1),
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function buildCommand(name) {
    return {
        gdc: {
            product: "analyticalDesigner",
            event: {
                name,
            }
        }
    };
}

export default function OtherCommands({sendCommand}) {
    const classes = useStyles();

    const handleAction = (event) => {
        event.preventDefault();

        const command = buildCommand(event.currentTarget.id);
        sendCommand(command);
    };

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Others
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button id="undo" variant="outlined" color={"primary"} onClick={handleAction}>
                    Undo
                </Button>
                <Button id="redo" variant="outlined" color={"primary"} onClick={handleAction}>
                    Redo
                </Button>
                <Button id="clear" variant="outlined" color={"primary"} onClick={handleAction}>
                    Clear
                </Button>
            </CardActions>
        </Card>
    );
}
