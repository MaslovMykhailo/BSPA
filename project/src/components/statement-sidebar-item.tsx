import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Content } from '@/content'
import { useIsActiveStatement, useTransactionsStore } from '@/store/statements'
import { Statement } from '@/types/statement'

export interface StatementSidebarItemProps {
  statement: Statement
  index: number
}

export function StatementSidebarItem({ statement: { id, toDate, fromDate }, index }: StatementSidebarItemProps) {
  const isActive = useIsActiveStatement(id)

  const { setActiveStatement } = useTransactionsStore()
  const onSelect = () => setActiveStatement(id)

  return (
    <SidebarMenuItem onClick={onSelect}>
      <SidebarMenuButton className={`flex flex-col gap-1 h-auto` + (isActive ? ' bg-muted' : '')}>
        <span>{Content.sidebar.statementItem.title(index + 1)}</span>
        <span className="text-xs text-muted-foreground">
          {Content.sidebar.statementItem.subtitle(fromDate, toDate)}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
