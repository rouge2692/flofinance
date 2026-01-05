import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SavingsHealthCardProps {
  totalSavings?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  currency?: string;
}

function SavingsHealthCard({
  totalSavings = 12450,
  monthlyIncome = 3200,
  monthlyExpenses = 3520,
  currency = '$',
}: SavingsHealthCardProps) {
  const net: number = monthlyIncome - monthlyExpenses; // positive = adding to savings
  const dippingIntoSavings: boolean = net < 0;
  const dippingAmount: number = Math.abs(net);
  const savingsRate: number = monthlyIncome === 0 ? 0 : net / monthlyIncome; // -0.1 = -10%
  const coverageMonths: number =
    monthlyExpenses === 0 ? Infinity : totalSavings / monthlyExpenses;

  let statusLabel: 'Good' | 'Caution' | 'Critical' = 'Good';
  let statusColor: string = '#16a34a'; // green

  if (coverageMonths < 1.5 || savingsRate < -0.2) {
    statusLabel = 'Critical';
    statusColor = '#dc2626'; // red
  } else if (coverageMonths < 3 || savingsRate < 0) {
    statusLabel = 'Caution';
    statusColor = '#f97316'; // orange
  }

  // For the income vs expenses bar
  const income: number = monthlyIncome;
  const expenses: number = monthlyExpenses;
  const maxVal: number = Math.max(income, expenses, 1);
  const incomeWidth: number = (income / maxVal) * 100;
  const expenseWidth: number = (Math.min(expenses, income) / maxVal) * 100;
  const overWidth: number =
    expenses > income ? ((expenses - income) / maxVal) * 100 : 0;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Savings health</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      </View>

      {/* Total savings */}
      <View style={styles.totalBlock}>
        <Text style={styles.totalLabel}>Total savings</Text>
        <Text style={styles.totalValue}>
          {currency}
          {totalSavings.toLocaleString()}
        </Text>
        <Text style={styles.subText}>
          Covers {coverageMonths === Infinity ? '∞' : coverageMonths.toFixed(1)}{' '}
          months of expenses
        </Text>
      </View>

      {/* Net flow this month */}
      <View style={styles.netRow}>
        <View>
          <Text style={styles.netLabel}>This month</Text>
          <Text
            style={[
              styles.netValue,
              dippingIntoSavings ? styles.negative : styles.positive,
            ]}
          >
            {dippingIntoSavings ? '-' : '+'}
            {currency}
            {dippingAmount.toLocaleString()}{' '}
            {dippingIntoSavings ? 'from savings' : 'to savings'}
          </Text>
        </View>
        <Text style={styles.rateText}>
          {savingsRate >= 0 ? '+' : ''}
          {(savingsRate * 100).toFixed(1)}%
        </Text>
      </View>

      {/* Income vs expenses bar */}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barSegment,
            styles.incomeBar,
            { width: `${incomeWidth}%` },
          ]}
        />
        <View
          style={[
            styles.barSegment,
            styles.expenseBar,
            { width: `${expenseWidth}%` },
          ]}
        />
        {overWidth > 0 && (
          <View
            style={[
              styles.barSegment,
              styles.overBar,
              { width: `${overWidth}%` },
            ]}
          />
        )}
      </View>
      <View style={styles.barLabels}>
        <Text style={styles.barLabel}>
          Income: {currency}
          {income.toLocaleString()}
        </Text>
        <Text style={styles.barLabel}>
          Expenses: {currency}
          {expenses.toLocaleString()}
        </Text>
      </View>

      {/* Bottom stats */}
      <View style={styles.bottomRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Income</Text>
          <Text style={styles.statValue}>
            {currency}
            {income.toLocaleString()}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Expenses</Text>
          <Text style={styles.statValue}>
            {currency}
            {expenses.toLocaleString()}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Savings rate</Text>
          <Text
            style={[
              styles.statValue,
              savingsRate >= 0 ? styles.positive : styles.negative,
            ]}
          >
            {savingsRate >= 0 ? '+' : ''}
            {(savingsRate * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: '#f9fafb',
    fontSize: 12,
    fontWeight: '600' as const,
  },
  totalBlock: {
    marginTop: 4,
  },
  totalLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  totalValue: {
    color: '#f9fafb',
    fontSize: 28,
    fontWeight: '700' as const,
    marginTop: 2,
  },
  subText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  netRow: {
    marginTop: 4,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-end' as const,
  },
  netLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  netValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginTop: 2,
  },
  positive: {
    color: '#22c55e',
  },
  negative: {
    color: '#f97316',
  },
  rateText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500' as const,
  },
  barContainer: {
    flexDirection: 'row' as const,
    height: 8,
    borderRadius: 999,
    overflow: 'hidden' as const,
    marginTop: 8,
    backgroundColor: '#1f2937',
  },
  barSegment: {
    height: '100%',
  },
  incomeBar: {
    backgroundColor: '#22c55e',
  },
  expenseBar: {
    backgroundColor: '#f97316',
  },
  overBar: {
    backgroundColor: '#dc2626',
  },
  barLabels: {
    marginTop: 4,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  barLabel: {
    color: '#9ca3af',
    fontSize: 11,
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  statItem: {
    flex: 1,
    alignItems: 'center' as const,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 11,
  },
  statValue: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600' as const,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#111827',
    opacity: 0.7,
  },
});

export default SavingsHealthCard;
