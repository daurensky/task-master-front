import {Form} from '@remix-run/react'
import {Input} from '~/components/ui/input'

export default function AppProjectNew() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Создать новый проект</h1>
      <Form>
        <Input placeholder="Название" />
      </Form>
    </section>
  )
}
