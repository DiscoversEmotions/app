import { Pipeline, Pipe, Pass } from '~/core/pipeline';

console.log(`Configure Pipeline`);

class GenerateRandomNumberPass extends Pass {
  constructor() {
    super({
      inputsNames: [],
      outputsNames: [`out`]
    });
  }

  run (inputs) {
    const val = Math.floor(Math.random() * 100);
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

const subPipeline = new Pipeline({
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

const mainPipeline = new Pipeline()
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
  pass: subPipeline,
  inputsBinding: {
    in: `multi2.out`
  }
}))
.setOutputsBindings({
  out: `sub-compo.out`,
  out2: `random.out`
});

console.log(mainPipeline.render({}));

export default mainPipeline;
