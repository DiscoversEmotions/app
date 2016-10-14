import { Composer, Pipe, Pass } from '~/core';

console.log(`Configure Composer`);

class GenerateRandomNumberPass extends Pass {
  constructor() {
    super({
      inputsNames: [],
      outputsNames: [`out`]
    });
  }

  run (inputs) {
    const val = Math.floor(Math.random() * 100);
    console.log(`Generate ${val}`);
    return {
      out: val
    };
  }
}

class MultiplyByPass extends Pass {
  constructor(mulBy) {
    super({
      inputsNames: [`in`],
      outputsNames: [`out`]
    });
    this.mulBy = mulBy;
  }

  run (inputs) {
    return {
      out: inputs.in * this.mulBy
    };
  }
}

class MultiplyPass extends Pass {
  constructor() {
    super({
      inputsNames: [`in1`, `in2`],
      outputsNames: [`out`]
    });
  }

  run (inputs) {
    return {
      out: inputs.in1 * inputs.in2
    };
  }
}

const mainComposer = new Composer();

mainComposer.addPipe(new Pipe({
  name: `random`,
  pass: new GenerateRandomNumberPass(),
  inputsBinding: {}
}));

mainComposer.addPipe(new Pipe({
  name: `multi1`,
  pass: new MultiplyByPass(4),
  inputsBinding: {
    in: `random.out`
  }
}));

mainComposer.addPipe(new Pipe({
  name: `multi2`,
  pass: new MultiplyPass(),
  inputsBinding: {
    in1: `multi1.out`,
    in2: `random.out`
  }
}));

mainComposer.setOutputsBindings({
  random: `random.out`,
  multi2: `multi2.out`,
  multi1: `multi1.out`
});

console.log(mainComposer.render({}));

export default mainComposer;
