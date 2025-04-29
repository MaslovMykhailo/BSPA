import { Content } from '@/content'

export function AppTitle() {
  return <h1 className="text-white text-2xl font-bold pt-2 m-auto">{Content.title()}</h1>
}
