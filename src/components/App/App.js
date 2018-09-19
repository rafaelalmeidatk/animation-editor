import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import Editor from '../Editor';
import AnimationsWindow from '../AnimationsWindow';
import FramesWindow from '../FramesWindow';
import CollidersWindow from '../CollidersWindow';
import InspectorWindow from '../InspectorWindow';
import 'reset-css';
import './styles.css';

class App extends Component {
  handleImageChange = data => {
    this.editor.changeImage(data);
  };

  handleAddAnimation = () => {
    this.editor.createFrame();
  };

  render() {
    // Do not render the editor inside tests
    const isTest = process.env.NODE_ENV === 'test';
    return (
      <div className="App bp3-dark">

        <div className="left-windows">
          <AnimationsWindow onImageChange={this.handleImageChange} />
          <FramesWindow />
        </div>
        <div className="right-windows">
          <CollidersWindow />
          <InspectorWindow />
        </div>
        
        {!isTest && <Editor ref={node => (this.editor = node)} />}
      </div>
    );
  }
}

export default App;
