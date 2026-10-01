import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ExpenseCategory,
  EXPENSE_CATEGORIES,
} from '../data/expenses';

type CategoryBreakdownProps = {
  totals: Record<ExpenseCategory, number>;
  maxAmount: number;
};

export function CategoryBreakdown({
  totals,
  maxAmount,
}: CategoryBreakdownProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        CATEGORY BREAKDOWN
      </Text>

      <Text style={styles.title}>
        Where your money goes
      </Text>

      <View style={styles.list}>
        {EXPENSE_CATEGORIES.map((category) => {
          const amount = totals[category.value];

          const percentage =
            maxAmount > 0
              ? (amount / maxAmount) * 100
              : 0;

          return (
            <View
              key={category.value}
              style={styles.category}
            >
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.emoji}>
                    {category.emoji}
                  </Text>

                  <Text style={styles.categoryName}>
                    {category.value}
                  </Text>
                </View>

                <Text style={styles.amount}>
                  ${amount.toFixed(2)}
                </Text>
              </View>

              <View style={styles.track}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${percentage}%`,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#29303A',
    borderRadius: 20,
    backgroundColor: '#171C23',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#727C8B',
  },
  title: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  list: {
    gap: 18,
    marginTop: 22,
  },
  category: {
    gap: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 15,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B1B8C3',
  },
  amount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  track: {
    height: 8,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#29303A',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#7EE2A8',
  },
});
