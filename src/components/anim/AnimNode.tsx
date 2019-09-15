import AnimContext, { ContextActionType } from './AnimContext';
import React, { useContext, useEffect, useRef } from 'react';

import getNodePosition from '../../utils/getNodePosition';

interface AnimBlockProps {
  group: string;
  name: string;

  children(ref: React.RefObject<HTMLElement>): React.ReactElement;
}

const AnimNode: React.FC<AnimBlockProps> = (props): React.ReactElement => {
  const { group, name, children } = props;

  const { state, dispatch } = useContext(AnimContext);
  const ref = useRef<HTMLElement>(null);
  const duration = 1000;
  const easing = 'ease';

  useEffect(() => {
    dispatch({
      type: ContextActionType.addNode,
      payload: { groupName: group, name, ref },
    });

    return (): void => {
      dispatch({
        type: ContextActionType.removeNode,
        payload: { groupName: group, name },
      });
    };
  }, [dispatch, group, name]);

  useEffect(() => {
    const byGroup = state.animationsByGroupName[group];
    if (byGroup && byGroup.endNodeName === name) {
      dispatch({
        type: ContextActionType.takeAnimation,
        payload: {
          groupName: group,
          startName: byGroup.startNodeName,
          endName: byGroup.endNodeName,
        },
      });

      const startNode = state.entities.nodes[byGroup.startNodeName];
      const endNode = state.entities.nodes[byGroup.endNodeName];

      if (startNode.ref && startNode.ref.current && endNode.ref && endNode.ref.current) {
        endNode.ref.current.style.transition = 'none';
        endNode.ref.current.style.transform = 'none';

        const startPosition = getNodePosition(startNode.ref.current);
        const endPosition = getNodePosition(endNode.ref.current);

        const targetScaleX = endPosition.width / startPosition.width;
        const targetScaleY = endPosition.height / startPosition.height;
        const targetTranslateX = startPosition.left - endPosition.left;
        const targetTranslateY = startPosition.top - endPosition.top;

        const oldTransform = endNode.ref.current.style.transform;

        startNode.ref.current.style.opacity = '0';
        endNode.ref.current.style.opacity = '1';

        endNode.ref.current.style.transform = `matrix(${1 / targetScaleX}, 0, 0, ${1 /
          targetScaleY}, ${targetTranslateX}, ${targetTranslateY})`;
        endNode.ref.current.style.transformOrigin = '0 0 0';

        setTimeout(() => {
          if (startNode.ref && startNode.ref.current && endNode.ref && endNode.ref.current) {
            endNode.ref.current.style.transition = `transform ${duration / 1000}s ${easing}`;
            endNode.ref.current.style.transform = oldTransform;
          }
        }, 100);
      }
    }
  }, [state, dispatch, group, name]);

  return <>{children(ref)}</>;
};

export default AnimNode;
