import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/header.css';

class Header extends Component {
  render() {
    const {
      email,
      total,
    } = this.props;

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
                { Number(total).toFixed(2) }
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
  expenses: state.wallet.expenses,
  total: state.wallet.totalValue,
});

Header.defaultProps = {
  email: 'default@email.com',
  total: 0,
};

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
};

export default connect(mapStateToProps, null)(Header);
