import { FileUpIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Content } from '@/content'
import { useAppStore } from '@/store'
import { Transaction, TransactionOperation } from '@/types/models'
import { formatDate } from '@/utils/date'
import { parseTransactionsCSV } from '@/utils/transacations-csv'
import { getTransactionCategory, getTransactionsFromDate, getTransactionsToDate } from '@/utils/transactions'

export function ImportStatementDialog() {
  const [open, setOpen] = useState(false)

  const [inputKey, setInputKey] = useState(crypto.randomUUID())
  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>()

  const { importStatement } = useAppStore()

  const onImportError = () => {
    setOpen(true)
    setError(true)
    setInputKey(crypto.randomUUID())
  }

  const onImportSuccess = (transactions: Transaction[]) => {
    setOpen(true)
    setError(false)
    setTransactions(transactions)
    setInputKey(crypto.randomUUID())
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const csv = event.target?.result

      if (!csv) {
        onImportError()
        return
      }

      const transactions = parseTransactionsCSV(csv as string)

      if (!transactions?.length) {
        onImportError()
        return
      }

      onImportSuccess(transactions)
    }

    reader.readAsText(file)
  }

  const onImportCancel = () => {
    setOpen(false)
    setError(false)
    setTransactions(undefined)
  }

  const onImportConfirm = () => {
    if (!transactions) return
    importStatement(transactions)

    setOpen(false)
    setError(false)
    setTransactions(undefined)
  }

  const importErrorContent = error && (
    <DialogContent className="w-[80%]">
      <DialogHeader>
        <DialogTitle>{Content.importTransactionsDialog.importError()}</DialogTitle>
        <DialogDescription>{Content.importTransactionsDialog.importErrorDescription()}</DialogDescription>
      </DialogHeader>
      <Table>
        <TableCaption>{Content.importTransactionsDialog.expectedFormat.caption()}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{Content.importTransactionsDialog.expectedFormat.columns.date()}</TableHead>
            <TableHead>{Content.importTransactionsDialog.expectedFormat.columns.description()}</TableHead>
            <TableHead className="text-right">
              {Content.importTransactionsDialog.expectedFormat.columns.amount()}
            </TableHead>
            <TableHead className="text-right">
              {Content.importTransactionsDialog.expectedFormat.columns.mcc()}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Content.importTransactionsDialog.expectedFormat.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
              <TableCell className="text-right">{row.mcc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-3 flex flex-col gap-2">
        <Label htmlFor="import-another-file">{Content.importTransactionsDialog.importAnotherFileLabel()}</Label>
        <Input key={inputKey} id="import-another-file" type="file" accept=".csv" onChange={onInputChange} />
      </div>
    </DialogContent>
  )

  const importSuccessContent = transactions && (
    <DialogContent className="w-[80%]">
      <DialogHeader>
        <DialogTitle>{Content.importTransactionsDialog.importSuccess()}</DialogTitle>
        <DialogDescription>
          {Content.importTransactionsDialog.importSuccessDescription(
            transactions.length,
            getTransactionsFromDate(transactions),
            getTransactionsToDate(transactions),
          )}
        </DialogDescription>
        <Table>
          <TableCaption>{Content.importTransactionsDialog.preview.caption()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{Content.importTransactionsDialog.preview.columns.date()}</TableHead>
              <TableHead>{Content.importTransactionsDialog.preview.columns.description()}</TableHead>
              <TableHead className="text-right">{Content.importTransactionsDialog.preview.columns.amount()}</TableHead>
              <TableHead className="text-right">
                {Content.importTransactionsDialog.preview.columns.category()}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 3).map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.details}</TableCell>
                <TableCell className="text-right">
                  {transaction.operation === TransactionOperation.income ? transaction.amount : -transaction.amount}
                </TableCell>
                <TableCell className="text-right">{getTransactionCategory(transaction)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-3 flex gap-2 justify-between">
          <Button variant="secondary" onClick={onImportCancel}>
            {Content.importTransactionsDialog.cancelButton()}
          </Button>
          <Button onClick={onImportConfirm}>{Content.importTransactionsDialog.confirmButton()}</Button>
        </div>
      </DialogHeader>
    </DialogContent>
  )

  return (
    <Dialog open={open} onOpenChange={(open) => (open ? setOpen(open) : onImportCancel())}>
      <div className="flex items-center gap-2">
        <input
          key={inputKey}
          ref={inputRef}
          id="import-file"
          type="file"
          accept=".csv"
          onChange={onInputChange}
          className="hidden"
        />
        <Button className="text-sm py-1 px-2 w-full" onClick={() => inputRef.current?.click()}>
          <FileUpIcon />
          {Content.importTransactionsButton.text()}
        </Button>
      </div>
      {importErrorContent}
      {importSuccessContent}
    </Dialog>
  )
}
