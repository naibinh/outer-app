import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function ExpansionLog(props) {
    const {timestamp, description, className, expanded} = props;
    const [isExpand, setExpand] = useState(expanded);

    function onChange(_event, expanded) {
        setExpand(Boolean(expanded));
    }

    return (
        <ExpansionPanel expanded={isExpand} onChange={onChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={className}>{timestamp}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {JSON.stringify(description)}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default function ExpansionLogs(props) {
    const {logs = []} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>
                Receive Logs
            </Typography>
            {logs.map((log, index) => {
                const {timestamp, description} = log;
                const expanded = index === 0;
                return (<ExpansionLog key={timestamp} timestamp={timestamp} description={description} className={classes.heading}
                                      expanded={expanded}/>)
            })}
        </div>
    );
}
