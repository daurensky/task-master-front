import {type MetaFunction} from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    {title: 'Task Master'},
    {
      name: 'description',
      content: 'Удобный менеджер задач! Создайте свою kanban доску.',
    },
  ]
}

export default function AppIndex() {
  return (
    <div>
      <h1>Work in progress</h1>
    </div>
  )
}
