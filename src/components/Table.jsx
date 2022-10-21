import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoAnimate from '@formkit/auto-animate';
import { connect } from 'react-redux';
import { editEntry, isEditing, totalExpenses } from '../redux/actions';
import totalValue from '../services/calculateTotal';
import EditEntry from './EditEntry';

import '../css/table.css';

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

  handleDelete = async (id) => {
    const {
      expenses,
      dispatch,
    } = this.props;

    const newExpenses = expenses.filter((value) => value.id !== Number(id));

    await dispatch(editEntry(newExpenses));
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
      <section
        className="expensesTable"
      >
        <table>
          <tbody
            ref={ autoAnimate }
          >
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
                          <img
                            src="https://img.icons8.com/material-outlined/48/000000/ball-point-pen.png"
                            alt="icone de edição"
                          />
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ () => this.handleDelete(id) }
                        >
                          <img
                            src="https://img.icons8.com/ios-glyphs/60/000000/delete.png"
                            alt="icone de lixeira"
                          />
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
