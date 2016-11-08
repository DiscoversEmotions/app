import oui from 'ouioui';
import _ from 'lodash';
import raf from 'raf';

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
    this._panel = this._createPanel();
    this._adders = {};
  }

  add(adderKey, adder) {
    console.log(`Add ${adderKey}`);
    this._adders[adderKey] = adder;
    this._updatePanel();
  }

  _createPanel (opts, callback) {
    let add = (obj, propName, annotation = {}, target) => {
      oui.annotate({ label: propName, ...annotation })(target, target.length);
      Object.defineProperty(target, target.length, {
        get: _ => obj[propName],
        set: v => obj[propName] = v,
        enumerable: true, configurable: true
      });
    };
    let addFolder = target => ({
      add: (obj, propName, annotation) => add(obj, propName, annotation, target),
      addFolder: annotation => {
        let api = [];
        oui.annotate({ label: `folder`, ...annotation })(target, target.push(api) - 1);
        return addFolder(api);
      },
      reset: () => {
        target = [];
        return addFolder(target);
      },
      getTarget: () => {
        return target;
      }
    });

    let p = oui.panel(opts);
    let handle = null;
    let draw = _ => {
      let api = this._panel ? this._panel.getTarget() : [];
      p(api, callback);
      handle = raf(draw);
    };
    draw();
    return addFolder([]);
  }

  _updatePanel() {
    this._panel = this._panel.reset();
    _.each(this._adders, (adder) => {
      adder(this._panel);
    });
  }

}
