/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-scroll";

// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class Nav extends React.Component {
  render() {
    // eslint-disable-next-line array-callback-return
    var links = this.props.pages.map(function(page, index) {
      if (page !== this.props.current) {
        return (
          <Link
            key={index}
            className={page}
            to={page}
            smooth={true}
            duration={400}
          >
            <span className="popover">{page.capitalizeFirstLetter()}</span>
          </Link>
        );
      }
    }, this);
    return <div className="nav">{links}</div>;
  }
}

Nav.defaultProps = {
  pages: ["main", "setting", "memos", "usage", "info"]
};

export default Nav;
