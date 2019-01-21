import Reactotron from 'reactotron-react-native';
import debugConfig from '@config/debug-config';

if (debugConfig.useReactotron) {
    Reactotron
    .configure({host:'192.168.1.143'})
    .useReactNative()
    .connect();

    console.tron = Reactotron;
}