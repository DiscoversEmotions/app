import dominus from 'dominus';
import _ from 'lodash';

export class Component {

  /**
   * elem: 'div' | HTMLElement | null | DominusElement
   */
  constructor($parent, elem) {
    this.children = {};
    this.props = null;
    if (elem === undefined) {
      this.$el = dominus(document.createElement('div'));
    }
    else if (elem === null) {
      this.$el = $parent;
    }else if (_.isString(elem)) {
      this.$el = dominus(document.createElement(elem));
    } else {
      this.$el = dominus(elem);
    }
    this.$parent = $parent;
    if (elem !== null) {
      this.$parent.append(this.$el);
    }
  }

  addChild (key, child, initProps) {
    this.children[key] = ({
      instance: new child(this.$el),
      props: initProps || null
    });
  }

  setChildProps (key, newProps) {
    if (_.isNil(this.children[key])) {
      throw new Error(`${key} does not exist in children list !`);
    }
    let lastProps = this.children[key].props;
    this.children[key].props = {
      ...lastProps,
      ...newProps
    };
  }

  _updateProps(props) {
    this.props = props;
  }

  _update (props) {
    this._updateProps(props);
    this.update();
    this._updateChildren();
  }

  _updateChildren () {
    _.forEach(this.children, (child, name) => {
      child.instance._update(child.props);
    });
  }

  rootUpdate () {
    this._update(null);
  }

  // Override this
  update (props) {
    // Do something
  }

}
