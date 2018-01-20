import { h, Component } from "preact";

const perspectiveAngle = 0.05;
const perspectiveTranslate = 0.5;

namespace Square {
  export interface Props {
    scale?: number;
    dAngle?: number;
    angle?: number;
    children?: any;
    perspective?: boolean;
    borderWidth?: number;
  }
  export interface State {
    tx: number;
    ty: number;
    rx: number;
    ry: number;
  }
}

export class Square extends Component<Square.Props, Square.State> {
  constructor(props?: Square.Props, context?: any) {
    super(props, context);
  }

  componentDidMount(): void {
    if (this.props.perspective === false) {
      return;
    }

    window.addEventListener(
      "deviceorientation",
      (e: DeviceOrientationEvent): void => {
        const x = e.gamma / 90.0 * 2; // left to right
        const y = e.beta / 150.0 * 2; // front to back

        const tx =
          (x * 100 - 50) * perspectiveTranslate * this.props.scale * 0.0025 -
          50;
        const ty =
          (y * 100 - 50) * perspectiveTranslate * this.props.scale * 0.0025 -
          50;
        const rx = -y / window.innerHeight * perspectiveAngle * 100;
        const ry = x / window.innerWidth * perspectiveAngle * 100;
        this.setState({
          tx,
          ty,
          rx,
          ry
        });
      }
    );

    document.addEventListener("mousemove", (ev: MouseEvent) => {
      const tx =
        (ev.clientX / window.innerWidth * 100 - 50) *
          perspectiveTranslate *
          this.props.scale *
          0.0025 -
        50;
      const ty =
        (ev.clientY / window.innerHeight * 100 - 50) *
          perspectiveTranslate *
          this.props.scale *
          0.0025 -
        50;
      const rx =
        -(window.innerHeight / 2 - ev.clientY) /
        window.innerHeight *
        perspectiveAngle *
        100;
      const ry =
        (window.innerWidth / 2 - ev.clientX) /
        window.innerWidth *
        perspectiveAngle *
        100;
      this.setState({
        tx,
        ty,
        rx,
        ry
      });
    });
  }

  private computeStyleFromProps(
    { scale = 1, borderWidth = 0.15, angle = 0, dAngle = 0 }: Square.Props,
    { tx = -50, ty = -50, rx = 0, ry = 0 }: Square.State
  ): any {
    return {
      border: `${borderWidth}rem solid rgba(0, 0, 0,.5)`,
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: `translateX(${tx}%) translateY(${ty}%) perspective( 1960px ) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${angle +
        dAngle}deg)`,
      width: `${scale}vh`,
      height: `${scale}vh`,
      zIndex: -scale + 100
    };
  }

  render(props: Square.Props, state: Square.State): JSX.Element {
    return (
      <div style={this.computeStyleFromProps(props, state)}>
        {props.children}
      </div>
    );
  }
}

namespace Circle {
  export interface Props {
    scale?: number;
    children?: any;
    borderWidth?: number;
  }
  export interface State {
    tx: number;
    ty: number;
    rx: number;
    ry: number;
  }
}

export class Circle extends Component<Circle.Props, Circle.State> {
  constructor(props?: Circle.Props, context?: any) {
    super(props, context);
  }

  componentDidMount(): void {
    window.addEventListener(
      "deviceorientation",
      (e: DeviceOrientationEvent): void => {
        const x = e.gamma / 90.0 * 2; // left to right
        const y = e.beta / 150.0 * 2; // front to back

        const tx =
          (x * 100 - 50) * perspectiveTranslate * this.props.scale * 0.0025 -
          50;
        const ty =
          (y * 100 - 50) * perspectiveTranslate * this.props.scale * 0.0025 -
          50;
        const rx = -y / window.innerHeight * perspectiveAngle * 100;
        const ry = x / window.innerWidth * perspectiveAngle * 100;
        this.setState({
          tx,
          ty,
          rx,
          ry
        });
      }
    );
    document.addEventListener("mousemove", (ev: MouseEvent) => {
      const tx =
        (ev.clientX / window.innerWidth * 100 - 50) *
          this.props.scale *
          0.0025 *
          perspectiveTranslate -
        50;
      const ty =
        (ev.clientY / window.innerHeight * 100 - 50) *
          this.props.scale *
          0.0025 *
          perspectiveTranslate -
        50;
      const rx =
        -(window.innerHeight / 2 - ev.clientY) /
        window.innerHeight *
        100 *
        perspectiveAngle;
      const ry =
        (window.innerWidth / 2 - ev.clientX) /
        window.innerWidth *
        100 *
        perspectiveAngle;
      this.setState({
        tx,
        ty,
        rx,
        ry
      });
    });
  }

  private computeStyleFromProps(
    { scale = 1, borderWidth = 0.15 }: Circle.Props,
    { tx = -50, ty = -50, rx = 0, ry = 0 }: Circle.State
  ): any {
    return {
      border: `${borderWidth}rem solid rgba(0, 0, 0, .5)`,
      borderRadius: `${scale}%`,
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: `translateX(${tx}%) translateY(${ty}%) perspective( 1960px ) rotateX(${rx}deg) rotateY(${ry}deg)`,
      width: `${scale}vh`,
      height: `${scale}vh`,
      zIndex: -scale + 100
    };
  }
  render(props: Circle.Props, state: Circle.State): JSX.Element {
    return (
      <div style={this.computeStyleFromProps(props, state)}>
        {props.children}
      </div>
    );
  }
}

namespace App {
  export interface Props {}
  export interface State {
    frame: number;
  }
}

export class App extends Component<App.Props, App.State> {
  constructor() {
    super();
    this.state = {
      frame: 0
    };
  }

  componentDidMount(): void {
    const animate = () => {
      this.setState({
        frame: this.state.frame + 1
      });
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }

  render(_, { frame }: App.State): JSX.Element {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: "10000px",
          overflow: "hidden"
        }}
      >
        {/* <Square scale={50} angle={0} />
        <Square scale={50} angle={22.5} />
        <Square scale={50} angle={45} />
        <Square scale={50} angle={67.5} /> */}
        <Circle scale={60} borderWidth={0.2} />
        <Circle scale={50} borderWidth={0.05} />
        <Circle scale={77} borderWidth={0.05} />
        <Square scale={100} angle={20} borderWidth={0.2} />
        <Square scale={50} angle={0 - frame / 20} borderWidth={0.05} />
        <Square scale={50} angle={22.5 - frame / 20} borderWidth={0.05} />
        <Square scale={50} angle={45 - frame / 20} borderWidth={0.05} />
        <Square scale={50} angle={67.5 - frame / 20} borderWidth={0.05} />

        <Circle scale={150} borderWidth={0.2} />
        <Circle scale={190} borderWidth={0.05} />
        <Circle scale={200} borderWidth={0.05} />

        <Square borderWidth={0} scale={50}>
          <div
            style={{
              padding: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <div>
              <h1 class="title has-text-black">Paul Sastrasinh</h1>
              <h2 class="subtitle has-text-black">Developer, NYC</h2>
              <div class="buttons animated fadeInUp">
                <a
                  class="button is-primary is-medium"
                  href="https://medium.com/@paul.sastrasinh"
                >
                  <span class="icon">
                    <i class="fa fa-github" />
                  </span>
                </a>
                <a
                  class="button is-primary is-medium"
                  href="https://www.linkedin.com/in/paul-sastrasinh-82450153/"
                >
                  <span class="icon">
                    <i class="fa fa-linkedin" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Square>
      </div>
    );
  }
}
