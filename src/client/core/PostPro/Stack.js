export class Stack {
  constructor(shadersPool) {
    this.passItems = [];
    this.shadersPool = shadersPool;
    this.passes = [];
  }

  addPass(shaderName, enabled, params, index) {
    let length = 0;
    const passItem = {
      shaderName,
      enabled: enabled || false
    };

    // TODO use and store params values

    this.passItems.push(passItem);
    length = this.passItems.length;

    this.updatePasses();

    if (index) {
      return this.movePassToIndex(this.passItems[length], index);
    }
    else {
      return length - 1;
    }
  }

  removePass(index) {
    this.passItems.splice(index, 1);
    this.updatePasses();
  }

  enablePass(index) {
    this.passItems[index].enabled = true;
    this.updatePasses();
  }

  disablePass(index) {
    this.passItems[index].enabled = false;
    this.updatePasses();
  }

  isPassEnabled(index) {
    return this.passItems[index].enabled;
  }

  movePassToIndex(index, destIndex) {
    this.passItems.splice(destIndex, 0, this.passItems.splice(index, 1)[0]);
    this.updatePasses();

    // TODO check if destIndex is final index
    return destIndex;
  }

  reverse() {
    this.passItems.reverse();
    this.updatePasses();
  }

  updatePasses() {
    this.passes = this.shadersPool.getPasses(this.passItems);

    // init default params for new passItems
    this.passItems.forEach((passItem, index) => {
      if (passItem.params === undefined) {
        passItem.params = JSON.parse(JSON.stringify(this.passes[index].params)); // clone params without reference to the real shader instance params
      }
    });
  }

  getPasses() {
    return this.passes;
  }
}
