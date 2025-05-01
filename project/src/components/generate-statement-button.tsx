import { FilePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Content } from '@/content'
import { useStatementsStore } from '@/store/statements'

export function GenerateStatementButton() {
  const { generateStatement } = useStatementsStore()
  return (
    <Button className="text-sm py-1 px-2" onClick={generateStatement}>
      <FilePlusIcon />
      {Content.generateTransactionsButton.text()}
    </Button>
  )
}
