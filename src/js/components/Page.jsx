import React from "react";

class Page extends React.Component {
  render() {
    return (
      <div id={this.props.name} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
