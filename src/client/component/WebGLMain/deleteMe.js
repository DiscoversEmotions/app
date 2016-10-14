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

const subComposer = new Composer({
  inputsNames: [`in`]
})
.addPipe(new Pipe({
  name: `multi1`,
  pass: new MultiplyByPass(4),
  inputsBinding: {
    in: `inputs.in`
  }
}))
.setOutputsBindings({
  out: `multi1.out`
});

const mainComposer = new Composer()
.addPipe(new Pipe({
  name: `random`,
  pass: new GenerateRandomNumberPass(),
  inputsBinding: {}
}))
.addPipe(new Pipe({
  name: `multi1`,
  pass: new MultiplyByPass(4),
  inputsBinding: {
    in: `random.out`
  }
}))
.addPipe(new Pipe({
  name: `multi2`,
  pass: new MultiplyPass(),
  inputsBinding: {
    in1: `multi1.out`,
    in2: `random.out`
  }
}))
.addPipe(new Pipe({
  name: `sub-compo`,
  pass: subComposer,
  inputsBinding: {
    in: `multi2.out`
  }
}))
.setOutputsBindings({
  out: `sub-compo.out`
});

console.log(mainComposer.render({}));

export default mainComposer;
