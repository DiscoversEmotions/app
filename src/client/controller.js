import Devtools from 'cerebral/devtools';
import { Controller } from 'cerebral';
import app from './modules/app';
import system from './modules/system';
import assets from './modules/assets';

export default Controller({
  devtools: Devtools(),
  modules: { app, system, assets }
});
