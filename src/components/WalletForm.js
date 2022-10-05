import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newEntry, receiveApi } from '../redux/actions';
import callApi from '../services/callApi';

class WalletForm extends Component {
  state = {
    loaded: false,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  async componentDidMount() {
    const {
      dispatch,
    } = this.props;

    const APIreturn = await callApi();

    const reduced = Object.keys(APIreturn)
      .filter((key) => !key.includes('USDT'))
      .reduce((obj, key) => (
        Object.assign(obj, {
          [key]: APIreturn[key],
        })
      ), {});

    this.setState({ exchangeRates: reduced });

    const currency = Object.keys(reduced);

    dispatch(receiveApi(currency.filter((value) => value !== 'USDT')));

    this.setState({ loaded: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const array = [];
    let id = 0;

    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;

    const {
      expenses,
      dispatch,
    } = this.props;

    if (expenses !== undefined) {
      array.push(...expenses);
      id += expenses;
    }

    array.push({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });

    dispatch(newEntry(array));
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { loaded } = this.state;

    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <input
          data-testid="value-input"
          type="number"
          name="value"
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {
            loaded
            && currencies.map((value) => (
              <option
                key={ value }
                value={ value }
              >
                { value }
              </option>
            ))
          }
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <input
          data-testid="description-input"
          type="text"
          name="description"
          onChange={ this.handleChange }
        />
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.defaultProps = {
  expenses: [],
};

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps, null)(WalletForm);
