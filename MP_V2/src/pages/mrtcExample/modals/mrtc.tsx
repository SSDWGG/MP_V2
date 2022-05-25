import { Model } from './model';
import CryptoJS from 'crypto-js';

// eslint-disable-next-line
export const MuduRTC = window.MuduRTC;
export const HDVideoConfig = { width: 1280, height: 720 }; // 大流摄像头配置
export const LDVideoConfig = { width: 160, height: 90 }; // 小流摄像头配置
export const userIdDefault = '123456';
export function random(len: 6) {
  const randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomArray = new Array(len)
    .fill(1)
    .map(() => randomString[Math.floor(Math.random() * 62)]);
  return randomArray.join('');
}
export function devicesDom(devices: any[]) {
  const header =
    '<div class="device header"><div>label</div><div>kind</div><div>deviceId</div></div>';
  const string = devices
    .map((device) => {
      return `<div class="device">
                <div>${device.label}</div>
                <div>${device.kind}</div>
                <div>${device.deviceId}</div>
              </div>`;
    })
    .join('');
  return header + string;
}
export async function getMediaDevices(ele?: string) {
  let deviceList: { kind: string; label: string; deviceId: string }[] = [];
  await window.MuduRTC.getMediaDevices().then((devices: any) => {
    console.log(devices, 'device');
    deviceList = devices;
    if (ele) {
      document.getElementById(ele)!.innerHTML = devicesDom(devices);
    }
  });
  return deviceList;
}

export class MrtcClientModal extends Model<MRTC.ClientModal> {
  constructor() {
    super({
      client: {},
      stream: {},
      tracks: [],
      clientConfig: {
        appId: '',
        appSecret: '',
        mrtcUrl: '',
        userId: '',
      },
      tracksConfig: {},
    });
  }

  updateClientState(mrtcClientModalUpdate: MRTC.ClientModalUpdate) {
    const updateKeys = Object.keys(mrtcClientModalUpdate);

    if (updateKeys.length > 0) {
      updateKeys.forEach((key: string) => {
        this.setState({ [key]: mrtcClientModalUpdate[key] });
      });
    }
  }

  // async createClientAndMultiPush(mrtcUrlHD: string, mrtcUrlLD: string, eleHD: string, eleLD: string) {
  //   const clientModalHD = await this.createClient(mrtcUrlHD, { videoConfig: HDVideoConfig });
  //   const clientModalLD = await this.createClient(mrtcUrlLD, { videoConfig: LDVideoConfig });
  //
  //   await this.cameraAndMic(clientModalHD as MRTC.ClientModal);
  //   await this.cameraAndMic(clientModalLD as MRTC.ClientModal);
  //
  //   try {
  //     await this.startPublish(clientModalHD as MRTC.ClientModal, eleHD);
  //     await this.startPublish(clientModalLD as MRTC.ClientModal, eleLD);
  //     return [clientModalHD, clientModalLD];
  //   } catch (e: any) {
  //     throw new Error(JSON.parse(e.message).message);
  //   }
  // }

  // async createClientAndPush(mrtcUrl: string, ele: string, videoConfig?: MRTC.VideoConfig, audioConfig?: MRTC.AudioConfig) {
  //   const clientModal = await this.createClient(mrtcUrl, { videoConfig, audioConfig });
  //   await this.cameraAndMic(clientModal as MRTC.ClientModal);
  //   try {
  //     await this.startPublish(clientModal as MRTC.ClientModal, ele);
  //     return clientModal;
  //   } catch (e: any) {
  //     throw new Error(JSON.parse(e.message).message);
  //   }
  //
  // }
  //
  // async createClientAndPushWithConfig(clientConfig: { appId: string, appSecret: string, mrtcUrl: string, userId?: string }, ele: string, videoConfig?: MRTC.VideoConfig, audioConfig?: MRTC.AudioConfig) {
  //   const clientModal = await this.createClientWithConfig(clientConfig, { videoConfig, audioConfig });
  //   await this.cameraAndMic(clientModal as MRTC.ClientModal);
  //   try {
  //     await this.startPublish(clientModal as MRTC.ClientModal, ele);
  //     return clientModal;
  //   } catch (e: any) {
  //     throw new Error(JSON.parse(e.message).message);
  //   }
  //
  // }
  //
  // async createClientAndPull(mrtcUrl: string, ele: string) {
  //   const clientModal = await this.createClient(mrtcUrl, {});
  //   const errorMsg = await this.subscribe(clientModal as MRTC.ClientModal, ele);
  //   // @ts-ignore
  //   if (errorMsg) {
  //     throw new Error(errorMsg);
  //   }
  //   return clientModal;
  // }
  //
  // async createClientAndPullWithConfig(config: { appId: string, appSecret: string, mrtcUrl: string, userId?: string }, ele: string) {
  //   const clientModal = await this.createClientWithConfig(config, {});
  //   const errorMsg = await this.subscribe(clientModal as MRTC.ClientModal, ele);
  //   // @ts-ignore
  //   if (errorMsg) {
  //     throw new Error(errorMsg);
  //   }
  //   return clientModal;
  // }
  //
  async getStream(
    streamType: number,
    ele: string,
    eleLocal?: string,
    cameraId?: string,
    micId?: string,
  ) {
    // eslint-disable-next-line no-useless-catch
    // try {
    switch (streamType) {
      case 0: {
        await this.cameraAndMic();
        break;
      }
      case 1: {
        await this.cameraStream(cameraId!);
        break;
      }
      case 2: {
        await this.micStream(micId!);
        break;
      }
      case 3: {
        await this.screenShare();
        break;
      }
      case 4: {
        await this.playCanvasStream(eleLocal as string);
        break;
      }
      case 5: {
        await this.playAudioStream(eleLocal as string);
        break;
      }
      default:
        break;
    }
    const videoDom = document.getElementById(ele) as HTMLVideoElement | HTMLAudioElement;
    const stream = new MediaStream(this.getState().tracks);
    this.setState({ stream });
    if (videoDom) {
      videoDom.srcObject = stream;
    }
    // } catch (error: any) {
    //   console.log(error);
    //   throw error;
    // }
  }
  //
  // async createClientAndMultiInputPush(mrtcUrl: string, ele: string) {
  //   const clientModal = await this.createClient(mrtcUrl, {});
  //   const errorMsg = await this.subscribe(clientModal as MRTC.ClientModal, ele);
  //   // @ts-ignore
  //   if (errorMsg) {
  //     throw new Error(errorMsg);
  //   }
  //   return clientModal;
  // }
  //
  // async createClientAndShareScreen(mrtcUrl: string, ele: string) {
  //   const clientModal = await this.createClient(mrtcUrl, {});
  //   await this.screenShare(clientModal as MRTC.ClientModal);
  //   try {
  //     await this.startPublish(clientModal as MRTC.ClientModal, ele);
  //     return clientModal;
  //   } catch (e: any) {
  //     throw new Error(JSON.parse(e.message).message);
  //   }
  // }

  async createMrtcClientWithConfig(
    config: { appId: string; appSecret: string; mrtcUrl: string; userId?: string },
    tracksConfig: { videoConfig?: MRTC.VideoConfig; audioConfig?: MRTC.AudioConfig },
  ) {
    const nonce = random(6);
    const timestamp = Date.now();
    const { appId, appSecret, mrtcUrl } = config;
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(appId + nonce + timestamp, appSecret),
    );
    const client = await MuduRTC.createClient({
      appId,
      nonce,
      timestamp,
      signature,
      mrtcUrl,
      userId: userIdDefault,
    });
    this.setState({
      client,
      tracks: [],
      tracksConfig,
      stream: {} as MediaStream,
      clientConfig: {
        appId,
        appSecret,
        mrtcUrl,
        userId: userIdDefault,
      },
    });
  }

  async createMrtcClient(
    mrtcUrl: string,
    tracksConfig: { videoConfig?: MRTC.VideoConfig; audioConfig?: MRTC.AudioConfig },
    userId?: string,
  ) {
    const nonce = random(6);
    const timestamp = Date.now();
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(appId + nonce + timestamp, appSecret!),
    );
    const userID = userId || userIdDefault;

    const client = await MuduRTC.createClient({
      appId,
      nonce,
      timestamp,
      signature,
      mrtcUrl,
      userId: userID,
    });
    this.setState({
      client,
      tracks: [],
      tracksConfig,
      stream: {} as MediaStream,
      clientConfig: {
        appId: appId!,
        appSecret: appSecret!,
        mrtcUrl,
        userId: userID,
      },
    });
  }

  async cameraAndMic() {
    const tracks = await MuduRTC.createCameraAndMicTracks(this.getState().tracksConfig.videoConfig);
    this.setState({ tracks });
    console.log('cameraAndMic finish', tracks);
  }

  async cameraAndMicWithTracksConfig(tracksConfig: {
    videoConfig?: MRTC.VideoConfig;
    audioConfig?: MRTC.AudioConfig;
  }) {
    const tracks = await MuduRTC.createCameraAndMicTracks(
      tracksConfig.videoConfig,
      tracksConfig.audioConfig,
    );
    this.setState({ tracks });
    console.log('cameraAndMic finish', tracks);
  }

  async cameraStream(cameraId: string) {
    const tracks = [
      await MuduRTC.createCameraTrack({ deviceId: cameraId || undefined }),
      MuduRTC.createEmptyAudioTrack(),
    ];
    this.setState({ tracks });
    console.log('cameraTrack', tracks);
  }

  async micStream(micId: string) {
    const tracks = [await MuduRTC.createMicTrack({ deviceId: micId || undefined })];
    this.setState({ tracks });
    console.log('micTrack', tracks);
  }

  async startPublish(ele: string) {
    await this.getState().client.publish(this.getState().tracks);
    console.log(this.getState().tracks, 'publish track');

    const videoDom = document.getElementById(ele) as HTMLVideoElement;
    const stream = new MediaStream(this.getState().tracks);
    this.setState({ stream });
    if (videoDom) {
      videoDom.srcObject = stream;
    }
    console.log('startPublish');
  }

  async unpublish(ele: string) {
    await this.getState()
      .client.unpublish()
      .then(() => {
        const videoDom = document.getElementById(ele) as HTMLVideoElement;
        if (videoDom) {
          videoDom.srcObject = null;
        }
      });
    console.log('unPublish');
  }

  async subscribe(ele: string) {
    let errorMsg = '';
    await this.getState()
      .client.subscribe()
      .then((tracks: any) => {
        const videoDom = document.getElementById(ele) as HTMLVideoElement;
        const stream = new MediaStream(tracks);
        this.setState({ stream });
        if (videoDom) {
          videoDom.srcObject = stream;
          console.log('subscribe', tracks);
        }
      })
      .catch((e: any) => {
        console.log(JSON.parse(e.message).message);
        errorMsg = JSON.parse(e.message).message;
        throw e;
      });
    return Promise.resolve(errorMsg);
  }

  async unsubscribe(ele: string) {
    await this.getState().client.unsubscribe();
    const videoDom = document.getElementById(ele) as HTMLVideoElement;
    this.setState({ stream: null });
    if (videoDom) {
      videoDom.srcObject = null;
      console.log('unsubscribe');
    }
  }

  async screenShare() {
    const tracks = await MuduRTC.createScreenTracks();
    if (!tracks[1]) {
      tracks[1] = MuduRTC.createEmptyAudioTrack();
    }
    this.setState({ tracks });
    console.log('screenShare', tracks);
  }

  async playVideoStream(ele: string) {
    // 需要谷歌89版本以下
    const video = document.getElementById(ele);
    const tracks = await MuduRTC.createVideoElementTracks(video);
    this.setState({ tracks });
    console.log('create local videoTrack', tracks);
  }

  async playCanvasStream(ele: string) {
    const canvas = document.getElementById(ele);
    console.log(canvas, 'canvas');

    const tracks = [await MuduRTC.createCanvasTrack(canvas)];
    this.setState({ tracks });
    console.log('create local canvasTrack', tracks);
  }
  async playAudioStream(ele: string) {
    const audio = document.getElementById(ele);
    const tracks = [await MuduRTC.createAudioElementTrack(audio)];
    this.setState({ tracks });
    console.log('create local audioTrack', tracks);
  }

  // async getMediaDevices(ele: string) {
  //   window.MuduRTC.getMediaDevices().then((devices: any) => {
  //     console.log(devices, 'device');
  //     document.getElementById(ele)!.innerHTML = devicesDom(devices);
  //   });
  // }

  async switchTo(ele: string) {
    console.log('switchTo', this.getState().tracks);
    const videoDom = document.getElementById(ele) as HTMLVideoElement;
    if (videoDom) {
      videoDom.srcObject = new MediaStream(this.getState().tracks);
    }
    this.getState().tracks.forEach((track: any) => {
      if (track.kind === 'video') {
        this.getState().client.replaceTrack(track);
      }
      if (track.kind === 'audio') {
        this.getState().client.replaceTrack(track);
      }
    });
  }
  // function getLocalVideoStats(clientModal: MRTC.ClientModal) {
  //   clientModal.client.getLocalVideoStats().then((stats: any ) => {
  //       console.log('getLocalVideoStats', stats);
  //   })
  // }

  // function getLocalAudioStats(clientModal: MRTC.ClientModal) {
  //   clientModal.client.getLocalAudioStats().then((stats: any) => {
  //       console.log('getLocalAudioStats, LD', stats);
  //   })
  // }

  // function getRemoteVideoStats(clientModal: MRTC.ClientModal) {
  //   clientModal.client.getRemoteVideoStats().then((stats: any) => {
  //       console.log('getRemoteVideoStats LD', stats);
  //   })
  // }

  // function getRemoteAudioStats(clientModal: MRTC.ClientModal) {
  //   clientModal.client.getRemoteAudioStats().then((stats: any) => {
  //       console.log('getAudioReceiverStats LD', stats);
  //   })
  // }

  // function getTransportStats(clientModal: MRTC.ClientModal) {
  //   clientModal.client.getStats().then((res: any) => {
  //       console.log('TransportStats LD',res);
  //   })
  // }
}
