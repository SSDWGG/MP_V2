import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTransition } from 'react-spring';

import Toast from '../Toast';

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const ToastContainer = ({ toasts }) => {
  console.log(toasts);
  const transitions =
    toasts.length === 0
      ? []
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useTransition(toasts, (toast) => toast.id, {
          from: {
            right: '-100%',
          },
          enter: {
            right: '0%',
          },
          leave: {
            right: '-100%',
          },
        });

  return createPortal(
    <Wrapper>
      {transitions.length === 0
        ? null
        : transitions.map(({ item, key, props }) => (
            <Toast key={key} id={item.id} style={props}>
              {item.content}
            </Toast>
          ))}
    </Wrapper>,
    document.body,
  );
};

export default ToastContainer;
