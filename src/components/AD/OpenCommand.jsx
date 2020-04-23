import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CARD_STYLE} from "../../styles";

const useStyles = makeStyles((theme) => ({
    ...CARD_STYLE(theme),
    projectId: {
        minWidth: 300,
        marginRight: theme.spacing(1),
    },
    insightId: {
        minWidth: 150,
    },
    button: {
        fontSize: "10px",
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
                },
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

        sendCommand(command, "openInsight");
    };

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
                <TextField required id="projectId" label="Project Id" inputRef={projectIdRef}
                           className={classes.projectId}/>
                <TextField required id="reportId" label="Insight Id" inputRef={insightIdRef}
                           className={classes.insightId}/>
            </CardContent>
            <CardActions>
                <Button className={classes.button} size="small" variant="outlined" color={"primary"}
                        onClick={openInsight}>
                    Open Insight
                </Button>
            </CardActions>
        </Card>
    );
}
