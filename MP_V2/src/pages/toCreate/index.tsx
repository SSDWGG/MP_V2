import React from 'react';
import './index.less';
const Void: React.FC = () => {
  return (
    <>
      {/* <div className="head"> */}
      {/* <div className="videoDiv">
          <video
            loop
            autoPlay
            preload="true"
            muted
            poster="true"
            className="Video"
            src="https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/M3P%20shot%20on/WM162_%E5%AE%98%E7%BD%91%E9%A6%96%E9%A1%B5ShotOn_MASTER_1200x720_20220509.mp4"
          />
          <div className="videoBanner">
            <h1>去创造去改变</h1>
            <h1>从想象到现象</h1>
          </div>
        </div> */}
      <div className="videoDiv">
        <video
          loop
          autoPlay
          preload="true"
          muted
          poster="true"
          className="Video"
          src="https://career.djicdn.com/broadway/public/0448b719-9f90-410c-841c-5e8cc2721cc6/campus-index-9.5.mp4"
        />
        <div className="videoBanner">
          <div className='text'>
             <h1>去创造去改变</h1>
          <h1>从想象到现象</h1>
          <h1>即刻出发</h1>
          </div>
         
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default Void;
