import { Component, h } from "preact";
import THREE = require("three");

export interface RendererProps extends JSX.DOMAttributes, JSX.HTMLAttributes {
  init: () => {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
  };

  dispose: () => void;

  draw: (
    clock: THREE.Clock
  ) => {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
  };
}
interface RendererState {}

export class Renderer extends Component<RendererProps, RendererState> {
  div: HTMLDivElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  updateCameraMatrix: boolean = false;

  componentDidMount(): void {
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setClearColor(0x000000, 0);

    window.addEventListener("resize", this.resize);
    window.requestAnimationFrame(this.tick);

    this.props.init();
    this.resize();
  }

  componentWillUnmount(): void {
    this.renderer.dispose();
    this.renderer = null;
    window.removeEventListener("resize", this.resize);
    this.props.dispose();
  }

  resize = () => {
    this.canvas.width = this.div.clientWidth;
    this.canvas.height = this.div.clientHeight;
    this.renderer.setSize(this.canvas.width, this.canvas.height, false);
    this.updateCameraMatrix = true;
  };

  tick = () => {
    if (!this.renderer) {
      return;
    }

    let { scene, camera } = this.props.draw(this.clock);
    if (this.updateCameraMatrix) {
      camera.aspect = this.canvas.width / this.canvas.height;
      camera.updateProjectionMatrix();
      this.updateCameraMatrix = false;
    }
    this.renderer.render(scene, camera);

    window.requestAnimationFrame(this.tick);
  };

  render(): JSX.Element {
    const { children, ...otherProps } = this.props;
    return (
      <div
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        ref={e => (this.div = e)}
      >
        <canvas ref={e => (this.canvas = e)} {...otherProps}>
          {children}
        </canvas>
      </div>
    );
  }
}
