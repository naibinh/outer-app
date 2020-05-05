import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EmbeddedGdc from "../EmbeddedGdc";
import ExpansionLogs from "../ExpansionLogs";
import Theme from "../Theme";
import KdCommands from "./Commands";
import {EMBEDDED_KD} from "./Constant";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    logs: {
        overflow: "scroll",
        maxHeight: "800px",
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);

    const logCommand = (command) => {
        setLogs([{
            id: Date.now(),
            direction: "outer to embedded",
            timestamp: (new Date()).toLocaleTimeString(),
            description: command.gdc,
        }, ...logs]);
    };

    useEffect(() => {
        window.addEventListener('message', function (event) {
            if (!event || !event.data) {
                return false;
            }

            let gdc;
            if (typeof event.data === "string") {
                try {
                    const data = JSON.parse(event.data);
                    gdc = data && data.gdc;
                } catch (_) {

                }
            } else {
                gdc = event.data.gdc;
            }

            if (gdc) {
                setLogs([{
                    id: Date.now(),
                    direction: "embedded to outer",
                    timestamp: (new Date()).toLocaleTimeString(),
                    description: gdc,
                }, ...logs]);
            }
        });
    }, [logs]);

    return (
        <Theme>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>Commands</Typography>
                            <KdCommands logCommand={logCommand}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <EmbeddedGdc appName="kd"  id={EMBEDDED_KD}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.logs}>
                            <ExpansionLogs logs={logs}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Theme>
    );
}

export default App;
