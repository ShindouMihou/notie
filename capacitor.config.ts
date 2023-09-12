import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pw.mihou.notie',
  appName: 'notie',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
