export class PointerLock {

  constructor(element) {
    this.element = element;
    this.havePointerLock = (
      `pointerLockElement` in document ||
      `mozPointerLockElement` in document ||
      `webkitPointerLockElement` in document
    );
  }

  activate() {
    // Ask the browser to lock the pointer
    this.element.requestPointerLock = (
      this.element.requestPointerLock ||
      this.element.mozRequestPointerLock ||
      this.element.webkitRequestPointerLock
    );
    this.element.requestPointerLock();
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
