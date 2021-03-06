const styles =  (theme) => {
  return {
      layout: {
          marginTop: 0,
          width: "auto",
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: '100%',
            float: 'left',
            marginLeft: "auto",
            marginRight: "auto"
          }
        },
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
  }
};

export default styles;