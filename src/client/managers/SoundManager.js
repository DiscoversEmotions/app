import { ConnectMethod } from '~/core';
import { AssetStatus, Scenes } from '~/types';
import sono from 'sono';

export class SoundManager {

  constructor(controller, assetsManager) {
    this.controller = controller;
    this.assetsManager = assetsManager;

    this.roomSound = null;
    this.emotionSound = null;
    this.glitchSound = null;
    this.transition = false;
  }

  boot() {
    this.update({}, this.controller, this);
    this.createSounds({}, this.controller, this);
  }

  @ConnectMethod(
    {
      ambiance_room: `assets.ambiance_room.status`,
      ambiance_emotion: `assets.ambiance_emotion.status`,
      sound_glitch: `assets.sound_glitch.status`
    }
  )
  createSounds({ ambiance_room, ambiance_emotion, sound_glitch }) {
    if (this.roomSound === null && ambiance_room === AssetStatus.Ready) {
      this.roomSound = sono.createSound({
        data: this.assetsManager.getAsset(`ambiance_room`),
        loop: true,
        volume: 0
      });
    }
    if (this.emotionSound === null && ambiance_emotion === AssetStatus.Ready) {
      this.emotionSound = sono.createSound({
        data: this.assetsManager.getAsset(`ambiance_emotion`),
        loop: true,
        volume: 0
      });
    }
    if (this.glitchSound === null && sound_glitch === AssetStatus.Ready) {
      this.glitchSound = sono.createSound({
        data: this.assetsManager.getAsset(`sound_glitch`),
        loop: false,
        volume: 0.5
      });
    }
  }

  @ConnectMethod(
    {
      scene: `app.scene.current`,
      transition: `app.scene.transition`
    }
  )
  update({ scene, transition }) {
    if (this.transition === false && transition) {
      this.glitchSound.play();
    }
    this.transition = transition;

    if (scene === Scenes.Room && this.roomSound && this.roomSound.playing === false) {
      this.roomSound.play();
      this.roomSound.fade(0.4, 0.5);
    }
    if (scene !== Scenes.Room && this.roomSound && this.roomSound.playing) {
      this.roomSound.fade(0, 0.5);
      setTimeout(() => { this.roomSound.stop(); }, 500);
    }

    if (scene === Scenes.Emotion && this.emotionSound && this.emotionSound.playing === false) {
      this.emotionSound.play();
      this.emotionSound.fade(2, 0.5);
    }
    if (scene !== Scenes.Emotion && this.emotionSound && this.emotionSound.playing) {
      this.emotionSound.fade(0, 0.5);
      setTimeout(() => { this.emotionSound.stop(); }, 500);
    }
  }

}
