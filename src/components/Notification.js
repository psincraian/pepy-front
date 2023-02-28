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

const Notification = ({ severity, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};

export default Notification;
