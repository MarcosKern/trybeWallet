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
        <section>
          <h1>
            Trybe
            <span>Wallet</span>
          </h1>
          <div>
            <h2
              data-testid="email-field"
            >
              { email }
            </h2>
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
        </section>
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
