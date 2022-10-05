import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    value: 0,
  };

  render() {
    const {
      email,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <header>
        <div>
          <h1>Trybewallet</h1>
        </div>
        <div>
          <h2
            data-testid="email-field"
          >
            { email }
          </h2>
          <div>
            <p>
              Total
              <span
                data-testid="header-currency-field"
              >
                BRL:
              </span>
              <span
                data-testid="total-field"
              >
                { value }
              </span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
