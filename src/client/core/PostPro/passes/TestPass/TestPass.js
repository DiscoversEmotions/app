import { Pass } from '../../Pass';

export class TestPass extends Pass {

  constructor(params) {
    super({
      inputsNames: ['yolo'],
      outputsNames: ['main']
    });
    this.params = params;
  }

  run (inputs) {
    console.log(`-> Run TestPass named ${this.name}`);
    return {
      main: null
    };
  }

}
