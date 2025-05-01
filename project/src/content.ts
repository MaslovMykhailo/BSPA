import { formatDate } from '@/utils/date'

import { getCategoryByMcc } from './utils/mcc'

export const Content = {
  title: () => 'Візуалізатор транзакцій',
  sidebar: {
    title: () => 'Записи транзакцій',
    group: {
      imported: {
        title: () => 'Імпортовані транзакції',
      },
      generated: {
        title: () => 'Згенеровані транзакції',
      },
    },
    statementItem: {
      title: (fromDate: Date, toDate: Date) => `З ${formatDate(fromDate)} по ${formatDate(toDate)}`,
      subtitle: (transactionsCount: number) => `Кількість транзакцій: ${transactionsCount}`,
      actions: {
        show: () => 'Показати',
        delete: () => 'Видалити',
      },
    },
    resetSelectionButton: {
      text: () => 'Cкинути вибір',
    },
  },
  visualizationSwitch: {
    tabs: {
      income: () => 'Надходження',
      expense: () => 'Витрати',
    },
  },
  generateTransactionsButton: {
    text: () => 'Згенерувати транзакції',
  },
  importTransactionsButton: {
    text: () => 'Імпорт CSV',
  },
  importTransactionsDialog: {
    importSuccess: () => 'Файл для імпорту завантажено',
    importSuccessDescription: (count: number, fromDate: Date, toDate: Date) =>
      `Імпортовано ${count} транзакцій з ${formatDate(fromDate)} по ${formatDate(toDate)}`,
    preview: {
      caption: () => 'Попередній перегляд імпортованих транзакцій',
      columns: {
        date: () => 'Дата',
        amount: () => 'Сума',
        description: () => 'Опис',
        category: () => 'Категорія',
      },
    },
    confirmButton: () => 'Імпортувати',
    cancelButton: () => 'Скасувати',
    importAnotherFileLabel: () => 'Імпортувати інший файл',
    importError: () => 'Помилка імпорту транзакцій',
    importErrorDescription: () =>
      'Транзакції мають бути у форматі CSV з такими колонками: "Дата i час операції", "Сума в валюті картки", "Деталі операції", "MCC".',
    expectedFormat: {
      caption: () => 'Приклад очікуваного формату',
      columns: {
        date: () => 'Дата i час операції',
        amount: () => 'Сума в валюті картки',
        description: () => 'Деталі операції',
        mcc: () => 'MCC',
      },
      data: [
        {
          date: '27.04.2025 12:00:00',
          amount: '100.00',
          description: 'Tранзакція 1',
          mcc: '1234',
        },
        {
          date: '12.04.2025 12:02:00',
          amount: '-200.00',
          description: 'Транзакція 2',
          mcc: '3421',
        },
      ],
    },
  },
  preview: {
    statement: {
      income: {
        title: () => 'Надходження',
        description: (fromDate: Date, toDate: Date) => `З ${formatDate(fromDate)} по ${formatDate(toDate)}`,
        transactionsCount: (count: number) => `Кількість транзакцій: ${count}`,
        totalAmount: (amount: number) => `Загальна сума: ${amount}`,
      },
      expense: {
        title: () => 'Витрати',
        description: (fromDate: Date, toDate: Date) => `З ${formatDate(fromDate)} по ${formatDate(toDate)}`,
        transactionsCount: (count: number) => `Кількість транзакцій: ${count}`,
        totalAmount: (amount: number) => `Загальна сума: ${amount}`,
      },
    },
    category: {
      title: (mcc: number) => `Категорія - ${getCategoryByMcc(mcc) ?? 'Невідома категорія'}`,
      description: (mcc: number) => `MCC: ${mcc}`,
      transactionsCount: (count: number) => `Кількість транзакцій: ${count}`,
      totalAmount: (amount: number) => `Загальна сума: ${amount}`,
    },
    transaction: {
      title: (date: Date) => `Транзакція - ${formatDate(date)}`,
      description: (mcc: number) => `Категорія: ${getCategoryByMcc(mcc) ?? 'Невідома категорія'}`,
      amount: (amount: number) => `Сума: ${amount}`,
      details: (details: string) => `Деталі: ${details}`,
    },
  },
  unknownMcc: () => 'Невідома категорія',
}
