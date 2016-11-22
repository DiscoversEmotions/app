import Devtools from 'cerebral/devtools';
import { Controller } from 'cerebral';
import {ContextProvider} from 'cerebral/providers';
import app from './modules/app';
import system from './modules/system';
import assets from './modules/assets';

export default function createController(core) {
  return Controller({
    devtools: Devtools(),
    modules: { app, system, assets },
    providers: [
      ContextProvider({
        core
      })
    ]
  });
};
