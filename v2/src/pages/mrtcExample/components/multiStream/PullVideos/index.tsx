import React from 'react';
import VideoDown from './VideoDown';
import VideoRight from './VideoRight';

export default function index() {
  return (
    <div>
      <div style={{ position: 'absolute', top: 16, left: '60%' }}>
        <VideoRight />
      </div>
      <div style={{ marginTop: 6 }}>
        <VideoDown />
      </div>
    </div>
  );
}
