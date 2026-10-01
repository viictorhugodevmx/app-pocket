import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type ExpenseFilterChipProps = {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
};

export function ExpenseFilterChip({
  label,
  emoji,
  selected,
  onPress,
}: ExpenseFilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      {emoji && (
        <Text style={styles.emoji}>
          {emoji}
        </Text>
      )}

      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
        ]}
      >
        {label}
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
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#303743',
    borderRadius: 999,
    backgroundColor: '#171C23',
  },
  chipSelected: {
    borderColor: '#7EE2A8',
    backgroundColor: '#173326',
  },
  chipPressed: {
    opacity: 0.75,
  },
  emoji: {
    fontSize: 13,
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
