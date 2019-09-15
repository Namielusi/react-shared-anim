import { createStyles, makeStyles } from '@material-ui/styles';

import AnimNode from './anim/AnimNode';
import Logo from './Logo';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      background: '#ecf0f1',
    },
    image: {},
    text: { marginLeft: 10 },
  })
);

const Details: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <AnimNode group="logo" name="details">
      {(ref: React.RefObject<HTMLDivElement>) => (
        <div className={classes.root} ref={ref}>
          <Logo className={classes.image} />
          <div className={classes.text}>Hello, World!</div>
        </div>
      )}
    </AnimNode>
  );
};

export default Details;
