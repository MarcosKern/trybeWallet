import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newEntry, receiveApi, totalExpenses } from '../redux/actions';
import callApi from '../services/callApi';
import totalValue from '../services/calculateTotal';

class WalletForm extends Component {
  state = {
    loaded: false,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
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

    const currency = Object.keys(reduced);

    dispatch(receiveApi(currency.filter((value) => value !== 'USDT')));

    this.setState({ loaded: true });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const array = [];

    const APIreturn = await callApi();

    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const {
      expenses,
      dispatch,
      id,
    } = this.props;

    if (expenses !== undefined) {
      array.push(...expenses);
    }

    array.push({
      description,
      value: `${value}`,
      currency,
      method,
      tag,
      id,
      exchangeRates: APIreturn,
    });

    await dispatch(newEntry(array, id + 1));
    this.dispatchTotal();

    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  dispatchTotal = () => {
    const {
      expenses,
      dispatch,
    } = this.props;
    dispatch(totalExpenses(totalValue(expenses)));
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies, editing } = this.props;
    const {
      loaded,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    return (
      <form
        onSubmit={ this.handleSubmit }
      >

        {
          !editing
            && (
              <section>
                <input
                  data-testid="value-input"
                  type="number"
                  name="value"
                  value={ value }
                  onChange={ this.handleChange }
                />
                <select
                  data-testid="currency-input"
                  name="currency"
                  defaultValue={ currency }
                  onChange={ this.handleChange }
                >
                  {
                    loaded
                    && currencies.map((coin) => (
                      <option
                        key={ coin }
                        value={ coin }
                      >
                        { coin }
                      </option>
                    ))
                  }
                </select>
                <select
                  name="method"
                  data-testid="method-input"
                  defaultValue={ method }
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
                <select
                  name="tag"
                  data-testid="tag-input"
                  defaultValue={ tag }
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
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <button type="submit">Adicionar despesa</button>
              </section>
            )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  id: state.wallet.entryesCount,
  editing: state.editing.edit,
});

WalletForm.defaultProps = {
  expenses: [],
  id: 0,
  editing: false,
};

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array),
  id: PropTypes.number,
  editing: PropTypes.bool,
};

export default connect(mapStateToProps, null)(WalletForm);
