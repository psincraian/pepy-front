import React from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </div>
  );
}
