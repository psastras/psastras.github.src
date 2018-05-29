import { Component, h } from "preact";
const classnames = require("classnames/bind");
const styles = require("./box.css");
const c = classnames.bind(styles);

export type BoxSpacing =
  | "none"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "huge";

export interface BoxProps extends JSX.DOMAttributes, JSX.HTMLAttributes {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  alignContent?: "start" | "center" | "end" | "around" | "stretch";
  alignSelf?: "start" | "center" | "end" | "stretch";
  direction?: "row" | "column";
  reverse?: boolean;
  flex?: boolean | "grow" | "shrink";
  full?: boolean | "horizontal" | "vertical";
  justify?: "start" | "center" | "between" | "around" | "end";
  margin?:
    | BoxSpacing
    | { horizontal?: BoxSpacing; vertical?: BoxSpacing; between?: BoxSpacing }
    | {
        top?: BoxSpacing;
        right?: BoxSpacing;
        bottom?: BoxSpacing;
        left?: BoxSpacing;
        between?: BoxSpacing;
      };
  pad?:
    | BoxSpacing
    | { horizontal?: BoxSpacing; vertical?: BoxSpacing; between?: BoxSpacing }
    | {
        top?: BoxSpacing;
        right?: BoxSpacing;
        bottom?: BoxSpacing;
        left?: BoxSpacing;
        between?: BoxSpacing;
      };
  textAlign?: "left" | "center" | "right";
  separator?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "horizontal"
    | "vertical"
    | "none";
  responsive?: boolean;
}
interface BoxState {}

const toClassnames = (prefix: string, props: string | any): string[] => {
  if (typeof props === "string") {
    return [`${prefix}-${props}`];
  }

  return Object.keys(props).map(k => `${prefix}-${k}-${props[k]}`);
};

export class Box extends Component<BoxProps, BoxState> {
  render(): JSX.Element {
    const {
      children,
      className,
      align,
      alignContent,
      alignSelf,
      direction = "column",
      reverse,
      flex = true,
      full,
      justify,
      margin,
      pad,
      textAlign,
      separator,
      responsive = true,
      ...otherProps
    } = this.props;
    return (
      <div
        className={c(
          `box`,
          align !== undefined && `align-${align}`,
          alignContent !== undefined && `align-content-${alignContent}`,
          alignSelf !== undefined && `align-self-${alignSelf}`,
          direction !== undefined && `direction-${direction}`,
          reverse !== undefined && `reverse-${reverse}`,
          flex !== undefined && `flex-${flex}`,
          full !== undefined && `full-${full}`,
          justify !== undefined && `justify-${justify}`,
          margin !== undefined && toClassnames("margin", margin),
          pad !== undefined && toClassnames("pad", pad),
          textAlign !== undefined && `text-align-${textAlign}`,
          separator !== undefined && `separator-${separator}`,
          responsive !== undefined && `responsive-${responsive}`,
          className
        )}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}
