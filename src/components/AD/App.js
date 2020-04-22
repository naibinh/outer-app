import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EmbeddedGdc from "../EmbeddedGdc";
import ExpansionLogs from "../ExpansionLogs";
import Commands from "./Commands";
import Theme from "../Theme";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        window.addEventListener('message', function (event) {
            if (!event || !event.data || !event.data.gdc) {
                return false;
            }

            setLogs([{
                timestamp: (new Date()).toLocaleString(),
                description: event.data.gdc,
            }, ...logs]);
        });
    }, [logs]);

    return (
        <Theme>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>Commands</Typography>
                            <Commands/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <EmbeddedGdc/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <ExpansionLogs logs={logs}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Theme>
    );
}

export default App;
