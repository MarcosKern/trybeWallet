const totalValue = (expenses) => {
  const defaultValue = 0;

  const atual = expenses.map((entry) => {
    const {
      currency,
      value,
      exchangeRates,
    } = entry;

    const reduced = Object.keys(exchangeRates)
      .filter((key) => key.includes(currency))
      .reduce((obj, key) => (
        Object.assign(obj, {
          [key]: exchangeRates[key],
        })
      ), {});

    const {
      ask,
    } = reduced[currency];
    return Number(value * ask).toFixed(2);
  });

  if (atual !== []) {
    const actualValue = atual
      .reduce((value1, value2) => Number(value1) + Number(value2), defaultValue)
      .toFixed(2);
    return Number(actualValue);
  }
};

export default totalValue;
