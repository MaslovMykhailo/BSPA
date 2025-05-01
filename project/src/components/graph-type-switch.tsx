import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Content } from '@/content'
import { useGraphStore } from '@/store/graph'
import { useActiveStatement } from '@/store/statements'
import { TransactionOperation } from '@/types/transaction'

export function GraphTypeSwitch() {
  const value = useGraphStore.use.activeGraph()
  const setActiveGraph = useGraphStore.use.setActiveGraph()
  const activeStatement = useActiveStatement()

  if (!activeStatement) {
    return null
  }

  return (
    <div className="absolute left-0 right-0 bottom-10 z-10">
      <Tabs value={value} onValueChange={setActiveGraph as (value: string) => void} className="m-auto w-min">
        <TabsList>
          <TabsTrigger className="w-[200px]" value={TransactionOperation.income}>
            {Content.visualizationSwitch.tabs.income()}
          </TabsTrigger>
          <TabsTrigger className="w-[200px]" value={TransactionOperation.expense}>
            {Content.visualizationSwitch.tabs.expense()}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
