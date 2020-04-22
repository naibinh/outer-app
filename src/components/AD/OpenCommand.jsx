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
    projectId: {
        minWidth: 300,
    },
    insightId: {
        minWidth: 200,
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function buildCommand(projectId, reportId) {
    return {
        gdc: {
            product: "analyticalDesigner",
            event: {
                name: "openInsight",
                data: {
                    reportId,
                    projectId
                }
            }
        }
    };
}

export default function OpenCommand({sendCommand}) {
    const classes = useStyles();
    const projectIdRef = useRef();
    const insightIdRef = useRef();

    const openInsight = (event) => {
        event.preventDefault();

        const projectId = projectIdRef.current.value;
        const insightId = insightIdRef.current.value;
        const command = buildCommand(projectId, insightId);

        sendCommand(command);
    };

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Open Insight
                </Typography>
                <form className={classes.textField} noValidate autoComplete="off">
                    <TextField required id="projectId" label="Project Id" inputRef={projectIdRef}
                               className={classes.projectId}/>
                    <TextField required id="reportId" label="Insight Id" inputRef={insightIdRef}
                               className={classes.insightId}/>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color={"primary"} onClick={openInsight}>
                    Open
                </Button>
            </CardActions>
        </Card>
    );
}
