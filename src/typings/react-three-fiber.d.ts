declare module "three.meshline" {}

declare module "react-three-fiber" {
  /// <reference types="react" />
  export function addEffect(callback: Function): void;
  export function renderGl(
    state: any,
    timestamp: number,
    repeat?: number,
    runGlobalEffects?: boolean
  ): number;
  export function invalidate(state: any, frames?: number): void;
  export const apply: (objects: any) => any;
  export function applyProps(
    instance: any,
    newProps: any,
    oldProps?: {},
    container?: any
  ): void;
  export function render(element: any, container: any, state: any): any;
  export function unmountComponentAtNode(container: any): void;
  export type CanvasContext = {
    ready: boolean;
    manual: boolean;
    vr: boolean;
    active: boolean;
    invalidateFrameloop: boolean;
    frames: number;
    aspect: number;
    subscribers: Function[];
    subscribe: (callback: Function) => () => any;
    setManual: (takeOverRenderloop: boolean) => any;
    setDefaultCamera: (camera: THREE.Camera) => any;
    invalidate: () => any;
    gl: THREE.WebGLRenderer;
    camera: THREE.Camera;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    scene: THREE.Scene;
    captured?: THREE.Intersection;
    canvas?: HTMLCanvasElement;
    canvasRect?: ClientRect | DOMRect;
    size?: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    viewport?: {
      width: number;
      height: number;
      factor: number;
    };
  };
  export type CanvasProps = {
    children: React.ReactNode;
    vr?: boolean;
    orthographic?: boolean;
    invalidateFrameloop?: boolean;
    gl?: THREE.WebGLRenderer;
    camera?:
      | Partial<THREE.Camera>
      | Partial<THREE.PerspectiveCamera>
      | Partial<THREE.OrthographicCamera>;
    raycaster?: THREE.Raycaster;
    mouse?: THREE.Vector2;
    style?: React.CSSProperties;
    pixelRatio?: number;
    onCreated?: Function;
  };
  export type Measure = [
    {
      ref: React.MutableRefObject<HTMLDivElement | undefined>;
    },
    {
      left: number;
      top: number;
      width: number;
      height: number;
    }
  ];
  export type IntersectObject = Event &
    THREE.Intersection & {
      ray: THREE.Raycaster;
      stopped: {
        current: boolean;
      };
      uuid: string;
    };
  export const stateContext: React.Context<CanvasContext>;
  export const Canvas: React.MemoExoticComponent<
    ({
      children,
      gl = undefined,
      camera = undefined,
      orthographic = false,
      raycaster = undefined,
      style = undefined,
      pixelRatio = undefined,
      vr = false,
      invalidateFrameloop = false,
      onCreated = undefined,
      ...rest
    }: CanvasProps) => JSX.Element
  >;
  import { CanvasContext } from "canvas";
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  export function useRender(fn: Function, takeOverRenderloop?: boolean): void;
  export function useThree(): Omit<CanvasContext, "subscribe">;
  export function useUpdate(
    callback: Function,
    dependents: [],
    optionalRef: React.MutableRefObject<any>
  ): React.MutableRefObject<any>;
  export function useResource(
    optionalRef?: React.MutableRefObject<any>
  ): React.MutableRefObject<any>;
}

declare namespace JSX {
  interface IntrinsicElements {
    meshLine: any;
    catmullRomCurve3: any;
    meshLineMaterial: any;
    group: any;
    geometry: any;
    lineBasicMaterial: any;
    mesh: any;
    octahedronGeometry: any;
    meshBasicMaterial: any;
    dodecahedronBufferGeometry: any;
    meshPhysicalMaterial: any;
    planeGeometry: any;
    spotLight: any;
    meshPhongMaterial: any;
    pointLight: any;
  }
}
