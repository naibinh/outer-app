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
    textField: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    title: {
        minWidth: 300,
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function buildCommand(title, gdcEventName) {
    return {
        gdc: {
            product: "analyticalDesigner",
            event: {
                name: gdcEventName,
                data: {
                    title
                }
            }
        }
    };
}

export default function SaveCommand({sendCommand}) {
    const classes = useStyles();
    const titleRef = useRef();

    const save = (event, gdcEventName) => {

        const title = titleRef.current.value;
        const command = buildCommand(title, gdcEventName);

        sendCommand(command);
    };

    const saveInsight = (event) => save(event, "saveInsight");
    const saveAsInsight = (event) => save(event, "saveAsInsight");

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Save Insight
                </Typography>
                <form className={classes.textField} noValidate autoComplete="off">
                    <TextField required id="title" label="Insight Name" inputRef={titleRef}
                               className={classes.title}/>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color={"primary"} onClick={saveInsight}>
                    Save
                </Button>
                <Button variant="outlined" color={"primary"} onClick={saveAsInsight}>
                    Save As
                </Button>
            </CardActions>
        </Card>
    );
}
