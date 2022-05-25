import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

const DrawCanvas = (props: { videoW: number; videoH: number; id: string }) => {
  const { videoW, videoH, id } = props;
  const [play, setPlay] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setPlay(!play);
    if (!videoRef.current?.paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  /* eslint-disable */
  useEffect(() => {
    if (canvasRef.current) {
      //获取canvas上下文
      let ctx = canvasRef.current.getContext('2d');

      //监听video的play事件，一旦开始，就把video逐帧绘制到canvas上
      videoRef.current?.addEventListener(
        'play',
        () => {
          const canvas = canvasRef.current!;
          canvas.width = videoRef.current?.videoWidth!;
          canvas.height = videoRef.current?.videoHeight!;

          let play = () => {
            if (videoRef.current) {
              ctx?.drawImage(
                videoRef.current!,
                0,
                0,
                videoRef.current?.videoWidth!,
                videoRef.current?.videoHeight!,
              );
            }
            requestAnimationFrame(play);
          };

          play();
        },
        false,
      );

      //暂停/播放视频
      // canvasRef.current?.addEventListener('click', () => {
      //     setPlay(!play);
      //     if (!videoRef.current?.paused) {
      //         videoRef.current?.pause();
      //     } else {
      //         videoRef.current?.play();
      //     }
      // }, false);
    }
    return () => {
      videoRef.current?.pause();
      setPlay(false);
    };
  }, []);
  /* eslint-enable */

  useEffect(() => {
    if (videoRef.current) {
      if (!videoRef.current?.paused) {
        setPlay(true);
      } else {
        setPlay(false);
      }
    }
  }, [videoRef.current?.paused]);

  return (
    <>
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        width={videoW}
        height={videoH}
        loop
        autoPlay
        muted
        src={`/localVideo.webm`}
      ></video>
      <canvas
        id={id}
        ref={canvasRef}
        width={160}
        height={90}
        style={{
          backgroundImage: `url(/videoPoster.jpeg)`,
          backgroundSize: `${videoW}px ${videoH}px`,
          width: `${videoW}px`,
          height: `${videoH}px`,
        }}
      ></canvas>
      <span
        style={{ color: '#fff', fontSize: 35, position: 'absolute', bottom: 0, right: 8 }}
        onClick={handleClick}
      >
        {play ? (
          <Button ghost size="small" shape="round">
            暂停
          </Button>
        ) : (
          <Button ghost size="small" shape="round">
            播放
          </Button>
        )}
      </span>
    </>
  );
};

export default DrawCanvas;
