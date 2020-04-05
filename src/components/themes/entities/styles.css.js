const styles =  (theme) => {
    return {
        paper: {
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
          }
        },
        button: {
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(1)
        },
        tag: {
          // width: 110,
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'margin-right': 5,
        }
      }
  };

  export default styles;