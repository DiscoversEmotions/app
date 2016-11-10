export class PointerLock {

  constructor(elem) {
    this.elem = elem;

    // Bind
    this._requestPointerLock = this._requestPointerLock.bind(this);
    this._pointerLockChange = this._pointerLockChange.bind(this);
    this._pointerLockError = this._pointerLockError.bind(this);

    document.addEventListener(`fullscreenchange`, this._requestPointerLock, false);
    document.addEventListener(`mozfullscreenchange`, this._requestPointerLock, false);
    document.addEventListener(`webkitfullscreenchange`, this._requestPointerLock, false);

    document.addEventListener(`pointerlockchange`, this._pointerLockChange, false);
    document.addEventListener(`mozpointerlockchange`, this._pointerLockChange, false);
    document.addEventListener(`webkitpointerlockchange`, this._pointerLockChange, false);

    document.addEventListener(`pointerlockerror`, this._pointerLockError, false);
    document.addEventListener(`mozpointerlockerror`, this._pointerLockError, false);
    document.addEventListener(`webkitpointerlockerror`, this._pointerLockError, false);

  }

  _requestPointerLock() {
    // if (document.webkitFullscreenElement === this.elem ||
    //   document.mozFullscreenElement === this.elem ||
    //   document.mozFullScreenElement === this.elem) { // Le caractère 'S' majuscule de l'ancien API. (note de traduction: ?)
    //   // L'élément est en plein écran, nous pouvons maintenant faire une requête pour capturer le curseur.
    // }
    this.elem.requestPointerLock = (
      this.elem.requestPointerLock ||
      this.elem.mozRequestPointerLock ||
      this.elem.webkitRequestPointerLock
    );
    this.elem.requestPointerLock();
  }

  _pointerLockChange() {
    if (document.mozPointerLockElement === this.elem ||
      document.webkitPointerLockElement === this.elem) {
      console.log(`Pointer Lock was successful.`);
    } else {
      // silently fail
      // console.log(`Pointer Lock was lost.`);
    }
  }

  _pointerLockError() {
    // silently fail
    // console.log(`Une erreur est survenue lors de la capture du curseur.`);
  }

  _requestFullscreen() {
    // On débute par mettre l'élément en plein écran. L'implémentation actuelle
    // demande à ce que l'élément soit en plein écran (fullscreen) pour
    // pouvoir capturer le pointeur--c'est une chose qui sera probablement
    // modifiée dans le futur.
    this.elem.requestFullscreen = this.elem.requestFullscreen ||
      this.elem.mozRequestFullscreen ||
      this.elem.mozRequestFullScreen || // Le caractère 'S' majuscule de l'ancienne API. (note de traduction: ?)
      this.elem.webkitRequestFullscreen;
    try {
      this.elem.requestFullscreen();
    } catch (e) {
      console.error(e);
    }
  }

  isActivated() {
    return document.pointerLockElement === this.elem;
  }

  tryActivate() {
    // this._requestFullscreen();
    this._requestPointerLock();
  }

  deactivate() {
    // Ask the browser to release the pointer
    document.exitPointerLock = (
      document.exitPointerLock ||
      document.mozExitPointerLock ||
      document.webkitExitPointerLock
    );
    document.exitPointerLock();
  }

}
