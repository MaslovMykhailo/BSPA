import { FilePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Content } from '@/content'

export function GenerateStatementButton() {
  return (
    <Button className="text-sm py-1 px-2">
      <FilePlusIcon />
      {Content.generateTransactionsButton.text()}
    </Button>
  )
}
