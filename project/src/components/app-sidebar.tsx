import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader } from '@/components/ui/sidebar'
import { Content } from '@/content'

import { GenerateStatementButton } from './generate-statement-button'
import { ImportStatementDialog } from './import-statement-dialog'

export function AppSidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <h3 className="text-2xl font-bold text-center">{Content.sidebar.title()}</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{Content.sidebar.group.imported.title()}</SidebarGroupLabel>
          <ButtonWrapper>
            <ImportStatementDialog />
          </ButtonWrapper>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{Content.sidebar.group.generated.title()}</SidebarGroupLabel>
          <ButtonWrapper>
            <GenerateStatementButton />
          </ButtonWrapper>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function ButtonWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex px-2">{children}</div>
}
