/* eslint-disable eqeqeq */
import { common, components } from "replugged";
import { KeybindRecorder } from "../lib/requiredModules";
const { React } = common;
const { FormItem } = components;
class CommonTypes extends React.Component {
  props: {
    title?: string;
    note?: string;
    size?: string;
    className?: string;
    value?: any;
    onClick?: () => void;
    onChange?: (arg0: unknown) => void;
    disabled?: boolean;
    clearable?: boolean;
  };
  state: {
    value: any;
  };
}

class CloseButton extends CommonTypes {
  render() {
    const size = this.props.size || "16px";
    return React.createElement(
      "svg",
      {
        className: this.props.className || "",
        fill: "currentColor",
        viewBox: "0 0 24 24",
        style: { width: size, height: size },
        onClick: this.props.onClick,
      },
      React.createElement("path", {
        d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z",
      }),
    );
  }
}

export class KeybindRecorderItem extends CommonTypes {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undefined
    props.clearable = props.clearable == undefined ? true : props.clearable;
    this.state = { value: this.props.value };
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.setState({ value: [] });
    this.props.onChange([]);
  }

  render() {
    return (
      <FormItem
        title={this.props.title}
        style={{ marginBottom: 20 }}
        note={this.props.note}
        notePosition="after"
        divider>
        <div
          {...{
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}>
          <div
            {...{
              style: {
                flexGrow: 1,
              },
            }}>
            {/*
            // @ts-ignore - LEGIT have no idea how to fix this i don't do tsx/jsx stuff - mooskyfish*/}
            <KeybindRecorder
              {...{
                disabled: this.props.disabled,
                defaultValue: this.state.value,
                onChange: (value) => {
                  this.setState({ value });
                  this.props.onChange(value);
                },
              }}
            />
          </div>
          {this.props.clearable && (
            <div
              {...{
                style: {
                  marginLeft: "5px",
                  color: "var(--interactive-normal)",
                  cursor: "pointer",
                },
              }}>
              <CloseButton
                {...{
                  onClick: this.clear,
                }}
              />
            </div>
          )}
        </div>
      </FormItem>
    );
  }
}