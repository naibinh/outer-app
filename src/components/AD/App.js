import React, {useEffect, useState, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EmbeddedGdc from "../EmbeddedGdc";
import ExpansionLogs from "../ExpansionLogs";
import Commands from "./Commands";
import Theme from "../Theme";
import {EMBEDDED_AD} from "./constant";

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

    const handleReceiveMessage = (event) => {
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
            setLogs(prevLogs => [{
                id: Date.now(),
                direction: "embedded to outer",
                timestamp: (new Date()).toLocaleTimeString(),
                description: gdc,
            }, ...prevLogs]);
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleReceiveMessage);

        return function unhandleReceiveMessage () {
            window.removeEventListener('message', handleReceiveMessage);
        };
    }, []);

    return (
        <Theme>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>Commands</Typography>
                            <Commands logCommand={logCommand}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <EmbeddedGdc appName="ad" id={EMBEDDED_AD}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
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
