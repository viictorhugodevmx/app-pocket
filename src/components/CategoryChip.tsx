import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { ExpenseCategory } from '../data/expenses';

type CategoryChipProps = {
  category: ExpenseCategory;
  emoji: string;
  selected: boolean;
  onPress: () => void;
};

export function CategoryChip({
  category,
  emoji,
  selected,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
        ]}
      >
        {category}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#303743',
    borderRadius: 999,
    backgroundColor: '#0D1117',
  },
  chipSelected: {
    borderColor: '#7EE2A8',
    backgroundColor: '#173326',
  },
  chipPressed: {
    opacity: 0.75,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#818A98',
  },
  labelSelected: {
    color: '#7EE2A8',
  },
});
