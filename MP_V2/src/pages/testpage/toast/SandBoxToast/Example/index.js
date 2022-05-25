import React, { useState } from 'react';

import { useToast } from '../ToastProvider';

const Example = () => {
  const { addToast } = useToast();
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        padding: '24px',
      }}
    >
      <p> This is an sandbox example of using Toast </p>{' '}
      <input value={value} onChange={(e) => setValue(e.target.value)} />{' '}
      <button
        onClick={() => {
          if (!!value) {
            addToast(value);
            setValue('');
          }
        }}
      >
        Add toast{' '}
      </button>{' '}
    </div>
  );
};

export default Example;
