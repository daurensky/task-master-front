import {Link} from '@remix-run/react'

const LegalTerms = () => {
  return (
    <div className="space-y-4">
      <h1 className="mb-8 text-center text-2xl">Наше условие обслуживания</h1>
      <p>
        Это пользовательское соглашение («Соглашение») является юридически
        обязательным документом, регулирующим использование вами
        («Пользователь») веб-приложения «Task Master» («Приложение»),
        разработанного{' '}
        <Link to="https://daurensky.dev" className="underline">
          https://daurensky.dev
        </Link>
        .
      </p>
      <h2>1. Принятие условий</h2>
      <p>
        Используя Приложение, Пользователь выражает свое согласие с условиями
        данного Соглашения. Если Пользователь не согласен с каким-либо из
        условий, он не должен использовать Приложение.
      </p>
      <h2>2. Учетные записи</h2>
      <p>
        Пользователь обязуется предоставлять точную и полную информацию при
        регистрации в Приложении. Пользователь несет полную ответственность за
        безопасность своей учетной записи и соглашается не делиться своими
        учетными данными с третьими лицами.
      </p>
      <h2>3. Права и ограничения</h2>
      <p>
        Пользователь обладает правом использования функциональности Приложения в
        соответствии с его назначением. Пользователь обязуется не нарушать права
        интеллектуальной собственности компании, включая авторские права и
        товарные знаки. Пользователь обязуется не использовать Приложение для
        целей, противоречащих действующему законодательству или нарушающих права
        третьих лиц.
      </p>
      <h2>4. Конфиденциальность</h2>
      <p>
        Компания обязуется соблюдать конфиденциальность персональных данных
        Пользователя в соответствии с применимым законодательством и политикой
        конфиденциальности.
      </p>
      <h2>5. Ответственность</h2>
      <p>
        Компания не несет ответственность за утрату данных или любые убытки,
        возникшие в результате использования или невозможности использования
        Приложения. Пользователь соглашается освободить компанию от любых
        претензий третьих лиц, возникших в результате нарушения Пользователем
        данного Соглашения.
      </p>
      <h2>6. Изменения в Соглашении</h2>
      <p>
        Компания оставляет за собой право вносить изменения в данное Соглашение
        без предварительного уведомления. Пользователь обязуется периодически
        проверять данное Соглашение на наличие изменений.
      </p>
      <h2>7. Прочие условия</h2>
      <p>
        В случае возникновения споров, связанных с использованием Приложения,
        стороны обязуются разрешать их путем переговоров. Никакие положения
        данного Соглашения не создают сторонам агентских, партнерских или
        совместных отношений. В случае недействительности какого-либо положения
        данного Соглашения, остальные положения остаются в силе.
      </p>
      <h2>8. Контакты</h2>
      <p>
        Для связи с компанией по вопросам, касающимся данного Соглашения, вы
        можете обратиться по следующему адресу электронной почты:{' '}
        <Link to="mailto:dkambarov17@gmail.com" className="underline">
          dkambarov17@gmail.com
        </Link>
        .
      </p>
      <h2>9. Принятие условий</h2>
      <p>
        Используя Приложение, Пользователь подтверждает, что он ознакомлен с
        условиями данного Соглашения и принимает их.
      </p>
      <footer>
        <p>Дата вступления в силу: [дата].</p>
      </footer>
    </div>
  )
}

export default LegalTerms