import Devtools from 'cerebral/devtools';
import { Controller } from 'cerebral';
import {ContextProvider} from 'cerebral/providers';
import app from './modules/app';
import system from './modules/system';
import assets from './modules/assets';
import keyboard from './modules/keyboard';

export default function createController(core) {
  const controller = Controller({
    devtools: Devtools(),
    modules: { app, system, assets, keyboard },
    providers: [
      ContextProvider({
        core
      })
    ]
  });
  return controller;
};
