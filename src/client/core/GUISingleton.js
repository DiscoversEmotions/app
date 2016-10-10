import oui from 'ouioui';

let guiSingletonInstance = null;

/**
 * GUI class
 */
export class GUISingleton {

  /**
   *
   */
  static getInstance() {
    if (guiSingletonInstance === null) {
      guiSingletonInstance = new GUISingleton();
    }
    return guiSingletonInstance;
  }

  /**
   * constructor method
   */
  constructor() {
    this.panel = oui.datoui();
  }
}
