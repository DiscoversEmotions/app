


const mainComposer  = new Composer({
  outputsBindings: {},
  inputsNames: []
});

mainComposer.add(new Pipe({
  name: 'pass1',
  pass: new DemoPass(),
  inputsBinding: {}
}));

mainComposer.add(new Pipe({
  name: 'to-screen',
  pass: new ToScreenPass(),
  inputsBinding: {
    main: 'pass1.main'
  }
}));
