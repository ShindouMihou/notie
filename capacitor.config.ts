import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pw.mihou.notie',
  appName: 'notie',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: "http://192.168.0.186:5173",
    cleartext: true
  }
};

export default config;
