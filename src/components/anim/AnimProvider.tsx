import Context, {
  ContextActionType,
  ContextActions,
  ContextState,
  State,
  initialState,
} from './AnimContext';
import React, { useMemo, useReducer } from 'react';

import _ from 'lodash/fp';
import setIn from '../../utils/setIn';

const reducer = (state: State, action: ContextActions): State => {
  switch (action.type) {
    case ContextActionType.addNode: {
      const { groupName, name, ref } = action.payload;
      const group = _.pathOr({ nodes: [] }, [groupName], state.entities.groups);

      const buildGroupNodes = _.pipe(
        _.castArray,
        _.union(_.__, group.nodes)
      );

      return _.pipe(
        setIn(['entities', 'groups', groupName, 'nodes'], buildGroupNodes(name)),
        setIn(['entities', 'nodes', name], { groupName, name, ref })
      )(state);
    }

    case ContextActionType.planAnimation: {
      const { groupName, startName, endName } = action.payload;

      return _.pipe(
        setIn(['animationsByGroupName', groupName, 'startNodeName'], startName),
        setIn(['animationsByGroupName', groupName, 'endNodeName'], endName)
      )(state);
    }

    case ContextActionType.takeAnimation: {
      const { groupName } = action.payload;

      return _.pipe(_.unset(['animationsByGroupName', groupName]))(state);
    }

    default:
      return state;
  }
};

const AnimProvider: React.FC = (props): React.ReactElement => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const context = useMemo<ContextState>(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default AnimProvider;
