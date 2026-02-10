import { useExpensesContext } from '../../../context/ExpenseContext.tsx';
import { useAccounts } from '../../../context/AccountContext.tsx';
import { useLiabilitiesContext } from '../../../context/LiabilityContext.tsx';

export const useExpenses = () => {
  const { expenses, isCategorizing, addExpense } = useExpensesContext();
  const { accounts, getAccountById } = useAccounts();
  const { liabilities } = useLiabilitiesContext();

  return {
    expenses,
    accounts,
    liabilities,
    isCategorizing,
    addExpense,
    getAccountById
  };
};