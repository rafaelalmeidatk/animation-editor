import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSelectedColliderIndex} from '../ducks/selection';
import {newCollider} from '../ducks/animation';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class CollidersWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    selectedFrameIndex: PropTypes.number,
    selectedColliderIndex: PropTypes.number,
    setSelectedColliderIndex: PropTypes.func,
    newCollider: PropTypes.func,
  };

  get colliders() {
    const {animations, selectedAnimationIndex, selectedFrameIndex} = this.props;
    if (animations && selectedAnimationIndex >= 0 && selectedFrameIndex >= 0) {
      var animation = animations.get(selectedAnimationIndex);
      var frames = animation.get('frames');
      if (frames.size > 0) {
        var frame = frames.get(selectedFrameIndex);
        return frame.get('colliders');
      }
    }
    return [];
  }

  createNewCollider = () => {
    const {selectedAnimationIndex, selectedFrameIndex} = this.props;
    if (selectedAnimationIndex >= 0 && selectedFrameIndex >= 0) {
      this.props.newCollider(selectedAnimationIndex, selectedFrameIndex);
    }
  }

  render() {
    const { 
      selectedColliderIndex,
      setSelectedColliderIndex,
    } = this.props;
    return (
      <Window
        title="Colliders"
        titleButtonAction={this.createNewCollider}
      >
        <WindowItemList
          items={this.colliders}
          selectedIndex={selectedColliderIndex}
          onItemClick={setSelectedColliderIndex}
        />
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['animation'].get('animations'),
    selectedAnimationIndex: state['selection'].get('selectedAnimationIndex'),
    selectedFrameIndex: state['selection'].get('selectedFrameIndex'),
    selectedColliderIndex: state['selection'].get('selectedColliderIndex'),
  };
}

const mapDispatchToProps = {
  setSelectedColliderIndex,
  newCollider,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollidersWindow);
