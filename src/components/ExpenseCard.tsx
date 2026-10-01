import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Expense,
  EXPENSE_CATEGORIES,
} from '../data/expenses';

type ExpenseCardProps = {
  expense: Expense;
  onLongPress: () => void;
};

export function ExpenseCard({
  expense,
  onLongPress,
}: ExpenseCardProps) {
  const categoryOption = EXPENSE_CATEGORIES.find(
    (option) => option.value === expense.category,
  );

  return (
    <Pressable
      onLongPress={onLongPress}
      delayLongPress={500}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {categoryOption?.emoji ?? '✨'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          {expense.title}
        </Text>

        <Text style={styles.meta}>
          {expense.category} · {expense.date}
        </Text>

        <Text style={styles.hint}>
          Hold to delete
        </Text>
      </View>

      <Text style={styles.amount}>
        -${expense.amount.toFixed(2)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: '#29303A',
    borderRadius: 20,
    backgroundColor: '#171C23',
  },
  cardPressed: {
    opacity: 0.75,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#242B35',
  },
  icon: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: '#818A98',
  },
  hint: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: '#596270',
  },
  amount: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '800',
    color: '#FF7A7A',
  },
});
