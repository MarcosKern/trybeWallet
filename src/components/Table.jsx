import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEditing, removeEntry, totalExpenses } from '../redux/actions';
import totalValue from '../services/calculateTotal';
import EditEntry from './EditEntry';

class Table extends Component {
  state = {
    data: {},
  };

  handleEdit = (data) => {
    const {
      dispatch,
    } = this.props;

    this.setState({ data });

    dispatch(isEditing(true));
  };

  handleDelete = async (event) => {
    const {
      expenses,
      dispatch,
    } = this.props;

    const {
      target: {
        parentElement: {
          parentElement: {
            id,
          },
        },
      },
    } = event;

    const newExpenses = expenses.filter((value) => value.id !== Number(id));

    await dispatch(removeEntry(newExpenses));
    this.dispatchTotal();
  };

  dispatchTotal = () => {
    const {
      expenses,
      dispatch,
    } = this.props;
    dispatch(totalExpenses(totalValue(expenses)));
  };

  render() {
    const { expenses, editing } = this.props;
    const { data } = this.state;
    return (
      <section>

        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses !== undefined
                && expenses.map((entry) => {
                  const {
                    id,
                    currency,
                    description,
                    method,
                    tag,
                    value,
                    exchangeRates,
                  } = entry;

                  const TO_FIXED = 2;

                  const reduced = Object.keys(exchangeRates)
                    .filter((key) => key.includes(currency))
                    .reduce((obj, key) => (
                      Object.assign(obj, {
                        [key]: exchangeRates[key],
                      })
                    ), {});

                  const {
                    name,
                    ask,
                  } = reduced[currency];
                  return (
                    <tr
                      id={ id }
                      key={ id }
                    >
                      <td>{ description }</td>
                      <td>{ tag }</td>
                      <td>{ method }</td>
                      <td>{ Number.parseFloat(value).toFixed(2) }</td>
                      <td>{ name }</td>
                      <td>{ Number.parseFloat(ask).toFixed(2) }</td>
                      <td>Real</td>
                      <td>{ (value * Number(ask)).toFixed(TO_FIXED) }</td>
                      <td>
                        <button
                          type="button"
                          data-testid="edit-btn"
                          onClick={
                            () => this.handleEdit({
                              id,
                              description,
                              tag,
                              method,
                              value,
                              currency,
                            })
                          }
                        >
                          edit
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ this.handleDelete }
                        >
                          excluir
                        </button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
        {
          editing
            && <EditEntry
              data={ data }
            />
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editing: state.editing.edit,
});

Table.defaultProps = {
  expenses: [],
  editing: false,
};

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

export default connect(mapStateToProps, null)(Table);
