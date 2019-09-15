import React from 'react';

export enum ContextActionType {
  addNode,
  removeNode,
  planAnimation,
  takeAnimation,
}

interface ContextAddNodeAction {
  type: ContextActionType.addNode;
  payload: { groupName: string; name: string; ref?: React.RefObject<HTMLElement> };
}

interface ContextRemoveNodeAction {
  type: ContextActionType.removeNode;
  payload: { groupName: string; name: string };
}

interface ContextPlantAnimationAction {
  type: ContextActionType.planAnimation;
  payload: { groupName: string; startName: string; endName: string };
}

interface ContextClearAnimationAction {
  type: ContextActionType.takeAnimation;
  payload: { groupName: string; startName: string; endName: string };
}

export type ContextActions =
  | ContextAddNodeAction
  | ContextRemoveNodeAction
  | ContextPlantAnimationAction
  | ContextClearAnimationAction;

export interface State {
  entities: {
    groups: {
      [key: string]: {
        nodes: string[];
      };
    };
    nodes: {
      [key: string]: {
        groupName: string;
        name: string;
        ref?: React.RefObject<HTMLElement>;
      };
    };
  };

  animationsByGroupName: {
    [key: string]: {
      startNodeName: string;
      endNodeName: string;
    };
  };
}

export interface ContextState {
  state: State;
  dispatch: React.Dispatch<ContextActions>;
}

export const initialState = {
  entities: { groups: {}, nodes: {} },

  animationsByGroupName: {},
};

export default React.createContext<ContextState>({ state: initialState, dispatch: () => {} });
