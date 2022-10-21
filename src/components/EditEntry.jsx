import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEntry, isEditing, totalExpenses } from '../redux/actions';
import totalValue from '../services/calculateTotal';

import '../css/editEntry.css';

class EditEntry extends React.Component {
  state = {
    id: '',
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const {
      data: {
        id,
        description,
        tag,
        value,
        currency,
      },
    } = this.props;

    this.setState({
      id,
      description,
      tag,
      value,
      currency,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const {
      expenses,
      dispatch,
    } = this.props;

    const newArray = expenses.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          value,
          currency,
          method,
          tag,
          description,
        };
      }
      return entry;
    });

    dispatch(isEditing(false));
    await dispatch(editEntry(newArray));
    this.dispatchTotal(newArray);
  };

  dispatchTotal = (newArray) => {
    const {
      dispatch,
    } = this.props;

    dispatch(totalExpenses(totalValue(newArray)));
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  };

  render() {
    const {
      currencies,
    } = this.props;
    const {
      currency,
      value,
      method,
      tag,
      description,
    } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="edit"
      >
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
            currencies.map((coin) => (
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
        <button type="submit">Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

EditEntry.defaultProps = {
  expenses: [],
};

EditEntry.propTypes = {
  expenses: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(EditEntry);
