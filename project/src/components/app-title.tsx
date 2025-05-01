import { Content } from '@/content'

export function AppTitle() {
  return <h1 className="text-white sm:text-2xl text-xl text-center font-bold pt-2 m-auto">{Content.title()}</h1>
}
