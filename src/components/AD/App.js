import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import EmbeddedGdc from "../EmbeddedGdc";
import ExpansionLogs from "../ExpansionLogs";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        window.addEventListener('message', function (event) {
            if (!event || !event.data || !event.data.gdc) return false;
            // const data = JSON.stringify(event.data);
            // console.log(data);
            setLogs([{
                timestamp: Date.now(),
                description: event.data.gdc,
            }, ...logs]);
        });
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Commands</Paper>
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
    );
}

export default App;
