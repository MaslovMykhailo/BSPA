import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Content } from '@/content'
import { useIsActiveStatement, useStatementsStore } from '@/store/statements'
import { Statement } from '@/types/statement'

export interface StatementSidebarItemProps {
  statement: Statement
}

export function StatementSidebarItem({ statement: { id, toDate, fromDate, transactions } }: StatementSidebarItemProps) {
  const isActive = useIsActiveStatement(id)
  const { setActiveStatement, removeStatement } = useStatementsStore()

  const onSelect = () => setActiveStatement(id)
  const onDelete = () => removeStatement(id)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className={`flex flex-col gap-1 h-auto` + (isActive ? ' bg-muted' : '')} onClick={onSelect}>
        <span>{Content.sidebar.statementItem.title(fromDate, toDate)}</span>
        <span className="text-xs text-muted-foreground">
          {Content.sidebar.statementItem.subtitle(transactions.length)}
        </span>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem onClick={onSelect}>
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {Content.sidebar.statementItem.actions.show()}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <span className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              {Content.sidebar.statementItem.actions.delete()}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
