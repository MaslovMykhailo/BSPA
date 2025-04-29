import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Content } from '@/content'
import { useAppStore, useIsActiveStatement } from '@/store'
import { Statement } from '@/types/models'

export interface StatementSidebarItemProps {
  statement: Statement
  index: number
}

export function StatementSidebarItem({ statement: { id, toDate, fromDate }, index }: StatementSidebarItemProps) {
  const isActive = useIsActiveStatement(id)

  const { setActiveStatement } = useAppStore()
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
