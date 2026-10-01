export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Learning'
  | 'Health'
  | 'Other';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
};

export type ExpenseCategoryOption = {
  value: ExpenseCategory;
  emoji: string;
};

export const EXPENSE_CATEGORIES: ExpenseCategoryOption[] = [
  {
    value: 'Food',
    emoji: '🍔',
  },
  {
    value: 'Transport',
    emoji: '🚕',
  },
  {
    value: 'Learning',
    emoji: '📚',
  },
  {
    value: 'Health',
    emoji: '💊',
  },
  {
    value: 'Other',
    emoji: '✨',
  },
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'expense-1',
    title: 'Udemy course',
    amount: 249,
    category: 'Learning',
    date: 'Today',
  },
  {
    id: 'expense-2',
    title: 'Lunch',
    amount: 185,
    category: 'Food',
    date: 'Today',
  },
  {
    id: 'expense-3',
    title: 'Uber',
    amount: 96,
    category: 'Transport',
    date: 'Yesterday',
  },
  {
    id: 'expense-4',
    title: 'Pharmacy',
    amount: 320,
    category: 'Health',
    date: 'Yesterday',
  },
];
