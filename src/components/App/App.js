import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../AppNavbar';
import Editor from '../Editor';
import AnimationsWindow from '../AnimationsWindow';
import FramesWindow from '../FramesWindow';
import CollidersWindow from '../CollidersWindow';
import InspectorWindow from '../InspectorWindow';
import PreviewWindow from '../PreviewWindow';
import 'reset-css';
import './styles.css';
import { createNewSchema } from '../../ducks/schema';
import { NAVBAR_HEIGHT } from '../../helpers/constants';
import { openImage } from '../../helpers/io';

class App extends Component {
  static propTypes = {
    createNewSchema: PropTypes.func.isRequired,
  };

  handleNewFile = () => {
    const { createNewSchema } = this.props;

    openImage().then((imageData) => {
      if (!imageData) return;
      const { data, path } = imageData;

      const spriteFileName = path.base;
      createNewSchema(spriteFileName);

      this.editor.loadBase64Image(data);
    });
  };

  render() {
    // Do not render the editor inside tests
    const isTest = process.env.NODE_ENV === 'test';
    const windowAreaHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

    return (
      <div className="App bp3-dark">
        <Navbar onNewFile={this.handleNewFile} />
        <div className="left-windows" style={{ height: windowAreaHeight }}>
          <AnimationsWindow />
          <FramesWindow />
          <PreviewWindow />
        </div>
        <div className="right-windows" style={{ height: windowAreaHeight }}>
          <CollidersWindow />
          <InspectorWindow />
        </div>

        {!isTest && <Editor ref={node => (this.editor = node)} />}
      </div>
    );
  }
}

const mapDispatchToProps = {
  createNewSchema,
};

export default connect(
  null,
  mapDispatchToProps
)(App);
