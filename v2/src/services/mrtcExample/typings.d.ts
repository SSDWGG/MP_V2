declare namespace MRTC {
  interface ClientModal {
    client: any;
    tracks: any;
    stream?: any;
    clientConfig: {
      appId: string;
      appSecret: string;
      mrtcUrl: string;
      userId: string;
    };
    tracksConfig: {
      videoConfig?: VideoConfig;
      audioConfig?: AudioConfig;
    };
  }
  interface ClientModalUpdate {
    client?: any;
    tracks?: any;
    stream?: any;
    clientConfig?: {
      appId: string;
      appSecret: string;
      mrtcUrl: string;
      userId: string;
    };
    tracksConfig?: {
      videoConfig?: VideoConfig;
      audioConfig?: AudioConfig;
    };
  }
  interface VideoConfig {
    deviceId?: number;
    aspectRatio?: number;
    facingMode?: 'user' | 'environment';
    frameRate?: number;
    width?: number;
    height?: number;
  }
  interface AudioConfig {
    deviceId?: number;
    AGC?: boolean;
    AEC?: boolean;
    ANS?: boolean;
    sampleRate?: number;
    sampleSize?: number;
    volume?: number;
  }
}
