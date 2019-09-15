import AnimContext, { ContextActionType } from './components/anim/AnimContext';
import { Button, Grid } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';

import Details from './components/Details';
import List from './components/List';
import _ from 'lodash/fp';

const useStyles = makeStyles(() =>
  createStyles({
    item: {},
  })
);

const App: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useContext(AnimContext);
  const classes = useStyles();

  const [elemPosition, setElemPosition] = useState('default');

  const handleStartAnim = useCallback(
    _.throttle(200, () => {
      if (elemPosition === 'default') {
        dispatch({
          type: ContextActionType.planAnimation,
          payload: { groupName: 'logo', startName: 'details', endName: 'list_3' },
        });

        setElemPosition('list');
      } else {
        dispatch({
          type: ContextActionType.planAnimation,
          payload: { groupName: 'logo', startName: 'list_3', endName: 'details' },
        });

        setElemPosition('default');
      }
    }),
    [elemPosition, dispatch]
  );

  useEffect(() => {
    console.log('Anim state', state);
  });

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.item}>
            <Button onClick={handleStartAnim}>Start Animation</Button>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <List />
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <Details />
          </Grid>
        </Grid>
      </header>
    </div>
  );
};

export default App;
