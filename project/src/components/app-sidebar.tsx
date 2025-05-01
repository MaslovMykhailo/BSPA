import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Content } from '@/content'
import { useGeneratedStatements, useImportedStatements, useStatementsStore } from '@/store/statements'

import { GenerateStatementButton } from './generate-statement-button'
import { ImportStatementDialog } from './import-statement-dialog'
import { StatementSidebarItem } from './statement-sidebar-item'

export function AppSidebar() {
  const { resetActiveStatement } = useStatementsStore()

  const importedStatements = useImportedStatements()
  const generatedStatements = useGeneratedStatements()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <h3 className="text-2xl font-bold text-center">{Content.sidebar.title()}</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{Content.sidebar.group.imported.title()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {importedStatements.map((statement, index) => (
                <StatementSidebarItem key={statement.id} statement={statement} index={index} />
              ))}
              <ImportStatementDialog />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarSeparator />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{Content.sidebar.group.generated.title()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generatedStatements.map((statement, index) => (
                <StatementSidebarItem key={statement.id} statement={statement} index={index} />
              ))}
              <GenerateStatementButton />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={resetActiveStatement}>{Content.sidebar.resetSelectionButton.text()}</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
