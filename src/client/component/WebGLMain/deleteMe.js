import { Pipeline, Pipe } from '~/core/pipeline';

console.log(`Configure Pipeline`);

class GenerateRandomNumberPipe extends Pipe {
  constructor(name) {
    super([],[`out`]);
  }

  run (inputs) {
    const val = Math.floor(Math.random() * 100);
    return {
      out: val
    };
  }
}

class MultiplyByPipe extends Pipe {
  constructor(mulBy) {
    super([`in`], [`out`]);
    this._mulBy = mulBy;
  }

  run (inputs) {
    return {
      out: inputs.in * this._mulBy
    };
  }
}

class MultiplyPipe extends Pipe {
  constructor() {
    super([`in1`, `in2`], [`out`]);
  }

  run (inputs) {
    return {
      out: inputs.in1 * inputs.in2
    };
  }
}

const subPipeline = new Pipeline([`in`], [`out`])
.mapInputs({
  in: `in`
})
.addPipe({
  name: `multi1`,
  mapInputs: {
    in: `inputs.in`
  },
  pipe: new MultiplyByPipe(4),
  mapOutputs: {
    yolo: `out`
  }
})
.mapOutputs({
  out: `multi1.yolo`
});

const mainPipeline = new Pipeline([], [`out`, `out2`])
.addPipe({
  name: `random`,
  mapInputs: {},
  pipe: new GenerateRandomNumberPipe(),
  mapOutputs: { out: `out` }
})
.addPipe({
  name: `multi1`,
  mapInputs: {
    in: `random.out`
  },
  pipe: new MultiplyByPipe(4),
  mapOutputs: {
    out: `out`
  }
})
.addPipe({
  name: `multi2`,
  mapInputs: {
    in1: `multi1.out`,
    in2: `random.out`
  },
  pipe: new MultiplyPipe(),
  mapOutputs: {
    out: `out`
  }
})
.addPipe({
  name: `sub-compo`,
  mapInputs: {
    in: `multi2.out`
  },
  pipe: subPipeline,
  mapOutputs: {
    out: `out`
  }
})
.mapOutputs({
  out: `sub-compo.out`,
  out2: `random.out`,
  out3: `multi2.out`
});

const mainPipelineResult = mainPipeline.render({});

console.log(mainPipelineResult);

console.log(subPipeline.render({
  in: mainPipelineResult.out3
}));

export default mainPipeline;
