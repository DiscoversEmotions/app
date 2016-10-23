import _ from 'lodash';
import { Pipe } from './Pipe';
import { PipelineItem } from './PipelineItem';

export class Pipeline extends Pipe {

  /**
   *
   */
  constructor (inputsNames, outputsNames) {
    super(inputsNames, outputsNames);

    this._pipelineItems = []; // Array of PipelineItem
    this._orderedPipelineItems = [];
    this._outputs = {};

    this._outputsMap = {};
    this._inputsMap = {};
  }

  /**
   * Public Chainanble Api
   */
  addPipe (pipeItemOptions) {
    const newPipelineItem = new PipelineItem(pipeItemOptions);

    if (_.find(this._pipelineItems, (pipelineItem) => (pipelineItem.getName() === newPipelineItem.getName()) )) {
      throw new Error(`A pipe named ${newPipelineItem.getName()} already exist !`);
    }
    this._pipelineItems.push(newPipelineItem);
    this._setDirty();
    return this;
  }

  mapOutputs (outputsMap) {
    this._outputsMap = _.isNil(outputsMap) ? {} : outputsMap;
    this.setOutputsNames(_.keys(this._outputsMap));
    this._setDirty();
    return this;
  }

  mapInputs (inputsMap) {
    this._inputsMap = _.isNil(inputsMap) ? {} : inputsMap;
    this.setInputsNames(_.keys(this._inputsMap));
    this._setDirty();
    return this;
  }

  getAllPipes() {
    return this._pipelineItems.map(pipelineItem => pipelineItem.getPipe());
  }

  /**
   * Override Pipe methods
   */

  run (inputs) {
    super.run(inputs);
    this._outputs = {};
    this._outputs[`inputs`] = this._formatWithMap(inputs, this._inputsMap);
    _.forEach(this._orderedPipelineItems, pipelineItem => {
      const outputs = this._renderPipelineItem(pipelineItem);
      this._outputs[pipelineItem.getName()] = outputs;
    });
    const outputs = this._formatWithMap(this._outputs, this._outputsMap);
    return outputs;
  }

  passThrough (inputs) {
    super.passThrough(inputs);
    return {}; // TODO
  }

  /**
   * Private
   */

  // Override
  _validate () {
    this._resolvePipesDependencies();
    super._validate();
  }

  _renderPipelineItem (pipelineItem) {
    const formatedInputs = this._formatWithMap(this._outputs, pipelineItem.getInputsMap());
    const outputs = pipelineItem.getPipe().render(formatedInputs);
    return this._formatWithMap(outputs, pipelineItem.getOutputsMap());
  }

  _getPipelineItem (pipelineItemName) {
    const pipelineItem = _.find(this._pipelineItems, (pipelineItem) => pipelineItem.getName());
    if (_.isNil(pipelineItem)) {
      throw new Error(`Can't find a pipelineItem named ${pipelineItemName} !`);
    }
    return pipelineItem;
  }

  _resolvePipesDependencies () {
    // Let's do some recursive stuff to check that all inputs/outputs are correct.
    _.forEach(this._pipelineItems, pipelineItem => pipelineItem.reset());

    const resolveDependencies = (inputs, pipelineItem) => {
      // find dependencies
      _.forEach(inputs, (path) => {
        const pathArray = path.split(`.`);
        const pipelineItemName = pathArray[0];
        const outputName = pathArray[1];
        // pipelineItem exist ?
        if (pipelineItemName === `inputs`) {
          return;
        }
        const dependPipelineItem = this._getPipelineItem(pipelineItemName);
        // pipelineItem has correct output ?
        const dependPipelineItemOutputs = _.keys(dependPipelineItem.getOutputsMap());
        if (!_.includes(dependPipelineItemOutputs, outputName)) {
          throw new Error(
            `Can't find output '${outputName}' in pass of pipelineItem '${dependPipelineItem.getName()}` +
            ` while resolving ${pipelineItem ? pipelineItem.getName() : `???`}'`
          );
        }
        // all ok, add dependPipelineItem as a dependency
        // NOTE: pipelineItem in null only for entry-pipelineItem
        if (pipelineItem) {
          pipelineItem.addDependency(dependPipelineItem);
        } else {
          dependPipelineItem.setPriorityGreaterThan(0);
        }
        // resolve dependPipelineItem -> recursive
        resolveDependencies(dependPipelineItem.getInputsMap(), dependPipelineItem);
      });
    };
    resolveDependencies(this._outputsMap, null);
    this._detectUnusedPipes();
    this._orderedPipelineItems = this._pipelineItems
      .filter(pipe => pipe.priority !== 0)
      .sort((left, right) => {
        return right.priority - left.priority;
      });
    this.resolved = true;
  }

  _detectUnusedPipes () {
    const unused = this._pipelineItems.filter(pipe => pipe.priority === 0);
    if (unused.length > 0) {
      console.warn(`The following pipes are not in the dependency tree :`);
      console.warn(unused);
    }
  }

  _formatWithMap (content, map) {
    return _.mapValues(map, (path) => {
      return _.get(content, path);
    });
  }

}
