
import { useIncomeContext } from '../../../context/IncomeContext.tsx';
import { useAccounts } from '../../../context/AccountContext.tsx';

export const useIncome = () => {
  const { incomes, addIncome } = useIncomeContext();
  const { accounts, getAccountById } = useAccounts();

  return {
    incomes,
    accounts,
    addIncome,
    getAccountById
  };
};
