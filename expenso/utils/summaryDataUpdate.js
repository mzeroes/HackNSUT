import store from 'redux/store';
import { updateSummary } from 'redux/action';

export const summaryDataUpdate = async () => {
  const { data } = await store.getState();
  let Expense = 0;
  let Income = 0;
  let Balance = 0;
  data.forEach((item) => {
    if (item.type === 'Expense') {
      Expense += Number(item.amount);
    } else if (item.type === 'Gain') {
      Income += Number(item.amount);
    }
  });
  Balance = Income - Expense;
  console.log(`BALANCE${Balance}`);
  await store.dispatch(updateSummary({
    Expense,
    Income,
    Balance
  }));
};
