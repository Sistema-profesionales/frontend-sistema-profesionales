import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#00695c',
  },
})(CircularProgress);


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CircularProgressBar(props) {
  const classes = useStyles();
  const { isCentered, size } = props;

  // useEffect(() => {
  //   document.getElementById("root").style.filter = 'blur(2px)';

  //   return () => {
  //     document.getElementById("root").style.filter = 'none';
  //   };
  // }, []);

  return (
    <div className={classes.root} style={isCentered !== undefined && isCentered ? { marginLeft: '50%' } : { marginLeft: 'unset' }}>
      <ColorCircularProgress className="loadingCircle" color="primary" size={size || 25} thickness={5} />
    </div>
  );
}