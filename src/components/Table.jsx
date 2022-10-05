import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
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

                const TO_FIXED = 3;

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
                    key={ id }
                  >
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ Number.parseFloat(value).toFixed(2) }</td>
                    <td>{ name }</td>
                    <td>{ Number.parseFloat(ask).toFixed(2) }</td>
                    <td>Real</td>
                    <td>{ value * Number.parseFloat(ask).toFixed(TO_FIXED) }</td>
                    <td>
                      <button type="button">edit</button>
                      <button type="button">excluir</button>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps, null)(Table);
