import React from 'react';
import { Group, Layer, Stage } from 'react-konva';
import { ReactReduxContext, Provider } from 'react-redux';
import GridLayer from './GridLayer';
import SpriteImage from './SpriteImage';
import FramesLayer from './FramesLayer';
import CollidersLayer from './CollidersLayer';

import {
  NAVBAR_HEIGHT,
  ZOOM_MULTIPLIER,
  MAX_ZOOM_MULTIPLIER,
  MIN_ZOOM_MULTIPLIER,
} from '../helpers/constants';

export default class Editor extends React.Component {
  state = {
    canvasSize: {
      width: window.innerWidth,
      height: window.innerHeight - NAVBAR_HEIGHT,
    },
    spriteSize: { width: 0, height: 0 },
    layersPosition: { x: 0, y: 0 },
  };

  sprite = React.createRef();

  componentDidMount() {
    this.removeAntiAliasing();
    window.addEventListener('wheel', this.handleWheel);
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    // We need to execute this on every update because the
    // stage is recreated, losing the context settings
    this.removeAntiAliasing();
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('resize', this.handleResize);
  }

  removeAntiAliasing = () => {
    // Remove AA
    const context = this.mainLayer.getContext()._context;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  };

  loadBase64Image = data => {
    this.sprite.current && this.sprite.current.loadBase64Image(data);
  };

  handleImageLoaded = imageData => {
    const layer = this.stage.getStage();
    const x = Math.floor((layer.width() - imageData.width) / 2);
    const y = Math.floor((layer.height() - imageData.height) / 2);
    this.setState(
      {
        spriteSize: { width: imageData.width, height: imageData.height },
        layersPosition: { x, y },
      },
      () => {
        // Reset everything after loading a new image
        layer.position({ x: 0, y: 0 });
        layer.scale({ x: 1, y: 1 });
      }
    );
  };

  handleWheel = e => {
    const isIncrease = e.deltaY < 0;
    const stage = this.stage.getStage();
    const currentScale = stage.scaleX();

    if (
      !stage.getPointerPosition() ||
      (isIncrease && currentScale >= MAX_ZOOM_MULTIPLIER) ||
      (!isIncrease && currentScale <= MIN_ZOOM_MULTIPLIER)
    )
      return;

    e.preventDefault();

    const mousePointTo = {
      x: stage.getPointerPosition().x / currentScale - stage.x() / currentScale,
      y: stage.getPointerPosition().y / currentScale - stage.y() / currentScale,
    };

    const newScale = isIncrease
      ? currentScale * ZOOM_MULTIPLIER
      : currentScale / ZOOM_MULTIPLIER;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: Math.floor(
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
      ),
      y: Math.floor(
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      ),
    };

    stage.position(newPos);
    stage.batchDraw();
  };

  handleResize = e => {
    this.setState({
      canvasSize: {
        width: e.target.innerWidth,
        height: e.target.innerHeight - NAVBAR_HEIGHT,
      },
    });
  };

  render() {
    const { canvasSize, spriteSize, layersPosition } = this.state;

    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          // We need to redraw the primitives due the rerender
          this.stage && this.stage.getStage().batchDraw()

          return (
            <Stage
              ref={node => (this.stage = node)}
              width={canvasSize.width}
              height={canvasSize.height}
              draggable={true}
            >
              <Provider store={store}>
                <GridLayer
                  x={layersPosition.x}
                  y={layersPosition.y}
                  width={spriteSize.width}
                  height={spriteSize.height}
                  squareDimensions={32}
                />

                <Layer
                  ref={node => (this.mainLayer = node)}
                  x={layersPosition.x}
                  y={layersPosition.y}
                  onWheel={this.onWheel}
                >
                  <SpriteImage
                    ref={this.sprite}
                    onImageLoaded={this.handleImageLoaded}
                  />

                  <FramesLayer />
                  <CollidersLayer />

                  <Group ref={node => (this.boxesGroup = node)} />
                </Layer>
              </Provider>
            </Stage>
          );
        }}
      </ReactReduxContext.Consumer>
    );
  }
}
