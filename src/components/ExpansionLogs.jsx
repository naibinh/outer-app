import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // backgroundColor: "#f5f5f5"
    },
    heading: {
        padding: "5px",
        margin: "5px",
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function ExpansionLog(props) {
    const classes = useStyles();
    const {timestamp, description, direction, expanded} = props;
    const [isExpand, setExpand] = useState(expanded);

    function onChange(_event, expanded) {
        setExpand(Boolean(expanded));
    }

    // update `isExpand` whenever `expanded` prop is changed
    useEffect(() => {
        setExpand(Boolean(expanded));
    }, [expanded]);

    return (
        <ExpansionPanel expanded={isExpand} onChange={onChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{`${timestamp} - ${direction}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TextField
                    fullWidth
                    multiline
                    rowsMax={20}
                    variant="outlined"
                    value={JSON.stringify(description, null, '\t')}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default function ExpansionLogs(props) {
    const {logs = []} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>Logs</Typography>
            {logs.map((log, index) => {
                const {id, timestamp, description, direction} = log;
                const expanded = index === 0;
                return (<ExpansionLog key={id} timestamp={timestamp} description={description} direction={direction}
                                      expanded={expanded}/>)
            })}
        </div>
    );
}
