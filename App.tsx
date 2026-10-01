import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { CategoryBreakdown } from './src/components/CategoryBreakdown';
import { CategoryChip } from './src/components/CategoryChip';
import { ExpenseCard } from './src/components/ExpenseCard';
import { ExpenseFilterChip } from './src/components/ExpenseFilterChip';
import {
  Expense,
  ExpenseCategory,
  EXPENSE_CATEGORIES,
  INITIAL_EXPENSES,
} from './src/data/expenses';

type ExpenseFilter = 'All' | ExpenseCategory;

export default function App() {
  const [expenses, setExpenses] =
    useState<Expense[]>(INITIAL_EXPENSES);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] =
    useState<ExpenseCategory>('Other');

  const [selectedFilter, setSelectedFilter] =
    useState<ExpenseFilter>('All');

  const parsedAmount = Number(amount);

  const canAddExpense =
    title.trim().length > 0 &&
    amount.trim().length > 0 &&
    Number.isFinite(parsedAmount) &&
    parsedAmount > 0;

  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const averageExpense =
    expenses.length > 0
      ? totalSpent / expenses.length
      : 0;

  const categoryTotals = expenses.reduce<
    Record<ExpenseCategory, number>
  >(
    (totals, expense) => ({
      ...totals,
      [expense.category]:
        totals[expense.category] + expense.amount,
    }),
    {
      Food: 0,
      Transport: 0,
      Learning: 0,
      Health: 0,
      Other: 0,
    },
  );

  const maxCategoryTotal = Math.max(
    ...Object.values(categoryTotals),
  );

  const filteredExpenses =
    selectedFilter === 'All'
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category === selectedFilter,
        );

  function handleAddExpense() {
    const cleanTitle = title.trim();

    if (!canAddExpense) {
      return;
    }

    const newExpense: Expense = {
      id: `expense-${Date.now()}`,
      title: cleanTitle,
      amount: parsedAmount,
      category,
      date: 'Now',
    };

    setExpenses((currentExpenses) => [
      newExpense,
      ...currentExpenses,
    ]);

    setTitle('');
    setAmount('');
    setCategory('Other');
    Keyboard.dismiss();
  }

  function handleDeleteExpense(expense: Expense) {
    Alert.alert(
      'Delete expense',
      `Do you want to delete "${expense.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setExpenses((currentExpenses) =>
              currentExpenses.filter(
                (currentExpense) =>
                  currentExpense.id !== expense.id,
              ),
            );
          },
        },
      ],
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.screen}
        edges={['top', 'bottom']}
      >
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            data={filteredExpenses}
            keyExtractor={(expense) => expense.id}
            renderItem={({ item }) => (
              <ExpenseCard
                expense={item}
                onLongPress={() =>
                  handleDeleteExpense(item)
                }
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.eyebrow}>
                  EXPENSE TRACKER
                </Text>

                <Text style={styles.title}>
                  Pocket
                </Text>

                <Text style={styles.subtitle}>
                  Know where your money goes.
                </Text>

                <View style={styles.balanceCard}>
                  <Text style={styles.balanceLabel}>
                    TOTAL SPENT
                  </Text>

                  <Text style={styles.balanceValue}>
                    ${totalSpent.toFixed(2)}
                  </Text>

                  <Text style={styles.balanceHint}>
                    Across {expenses.length} expenses
                  </Text>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                      EXPENSES
                    </Text>

                    <Text style={styles.statValue}>
                      {expenses.length}
                    </Text>
                  </View>

                  <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                      AVERAGE
                    </Text>

                    <Text style={styles.statValue}>
                      ${averageExpense.toFixed(0)}
                    </Text>
                  </View>
                </View>

                <CategoryBreakdown
                  totals={categoryTotals}
                  maxAmount={maxCategoryTotal}
                />

                <View style={styles.formCard}>
                  <Text style={styles.formLabel}>
                    NEW EXPENSE
                  </Text>

                  <Text style={styles.formTitle}>
                    Add a transaction
                  </Text>

                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Expense title"
                    placeholderTextColor="#69717F"
                    returnKeyType="next"
                    style={styles.input}
                  />

                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Amount"
                    placeholderTextColor="#69717F"
                    keyboardType="decimal-pad"
                    style={styles.input}
                  />

                  <Text style={styles.categoryLabel}>
                    CATEGORY
                  </Text>

                  <View style={styles.categoryList}>
                    {EXPENSE_CATEGORIES.map((option) => (
                      <CategoryChip
                        key={option.value}
                        category={option.value}
                        emoji={option.emoji}
                        selected={category === option.value}
                        onPress={() =>
                          setCategory(option.value)
                        }
                      />
                    ))}
                  </View>

                  <Pressable
                    disabled={!canAddExpense}
                    onPress={handleAddExpense}
                    style={({ pressed }) => [
                      styles.addButton,
                      !canAddExpense &&
                        styles.addButtonDisabled,
                      pressed &&
                        canAddExpense &&
                        styles.addButtonPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.addButtonText,
                        !canAddExpense &&
                          styles.addButtonTextDisabled,
                      ]}
                    >
                      Add Expense
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.transactionsHeader}>
                  <Text style={styles.sectionTitle}>
                    Recent expenses
                  </Text>

                  <Text style={styles.sectionCount}>
                    {filteredExpenses.length}
                  </Text>
                </View>

                <View style={styles.filterList}>
                  <ExpenseFilterChip
                    label="All"
                    selected={selectedFilter === 'All'}
                    onPress={() =>
                      setSelectedFilter('All')
                    }
                  />

                  {EXPENSE_CATEGORIES.map((option) => (
                    <ExpenseFilterChip
                      key={option.value}
                      label={option.value}
                      emoji={option.emoji}
                      selected={
                        selectedFilter === option.value
                      }
                      onPress={() =>
                        setSelectedFilter(option.value)
                      }
                    />
                  ))}
                </View>

                {selectedFilter !== 'All' && (
                  <Text style={styles.filterHint}>
                    Showing {selectedFilter} expenses
                  </Text>
                )}
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>
                  🧾
                </Text>

                <Text style={styles.emptyTitle}>
                  No expenses here
                </Text>

                <Text style={styles.emptyText}>
                  There are no expenses in this category yet.
                </Text>
              </View>
            }
            ListFooterComponent={
              filteredExpenses.length > 0 ? (
                <View style={styles.footer}>
                  <Text style={styles.footerEmoji}>
                    💸
                  </Text>

                  <Text style={styles.footerText}>
                    Small expenses add up. Track them.
                  </Text>
                </View>
              ) : null
            }
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />

          <StatusBar style="light" />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#7F8998',
  },
  title: {
    marginTop: 8,
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: '#99A2AF',
  },
  balanceCard: {
    marginTop: 30,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#7EE2A8',
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#17462D',
  },
  balanceValue: {
    marginTop: 10,
    fontSize: 38,
    fontWeight: '800',
    color: '#0D2C1B',
  },
  balanceHint: {
    marginTop: 6,
    fontSize: 13,
    color: '#286543',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    padding: 18,
    borderWidth: 1,
    borderColor: '#29303A',
    borderRadius: 18,
    backgroundColor: '#171C23',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: '#727C8B',
  },
  statValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  formCard: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#29303A',
    borderRadius: 20,
    backgroundColor: '#171C23',
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#727C8B',
  },
  formTitle: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  input: {
    minHeight: 52,
    marginTop: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#303743',
    borderRadius: 14,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#0D1117',
  },
  categoryLabel: {
    marginTop: 18,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: '#727C8B',
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#7EE2A8',
  },
  addButtonDisabled: {
    backgroundColor: '#29303A',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D2C1B',
  },
  addButtonTextDisabled: {
    color: '#656E7B',
  },
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#737D8C',
  },
  filterList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    marginBottom: 18,
  },
  filterHint: {
    marginTop: -6,
    marginBottom: 18,
    fontSize: 12,
    color: '#7EE2A8',
  },
  separator: {
    height: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 44,
  },
  emptyEmoji: {
    fontSize: 34,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#737D8C',
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
    padding: 20,
  },
  footerEmoji: {
    fontSize: 28,
  },
  footerText: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    color: '#737D8C',
  },
});
