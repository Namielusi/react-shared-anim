import { createStyles, makeStyles } from '@material-ui/styles';

import AnimNode from './anim/AnimNode';
import Logo from './Logo';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: { display: 'flex', flexDirection: 'column' },
    item: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
      padding: 10,
      borderRadius: 5,
      background: '#ecf0f1',
    },
    image: {},
    text: { marginLeft: 10 },
  })
);

const List: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <div className={classes.root}>
      {items.map(item => (
        <AnimNode group="logo" name={`list_${item.id}`}>
          {(ref: React.RefObject<HTMLDivElement>) => (
            <div key={item.id} className={classes.item} ref={ref}>
              <Logo className={classes.image} />
              <span className={classes.text}>List item #{item.id}</span>
            </div>
          )}
        </AnimNode>
      ))}
    </div>
  );
};

export default List;
