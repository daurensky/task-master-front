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

const AppIndex = () => {
  return (
    <div>
      <h1>Все доски</h1>
    </div>
  )
}

export default AppIndex
