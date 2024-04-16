import { Button, Form, FormProps, Input, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import { useNotify } from 'app/providers/app'
import { IMainFields } from 'pages/auth/model/interface'
import { StyledForgetPass, StyledFormContainer } from 'pages/auth/model/styles'
import React, { FC } from 'react'
import { useToggle } from 'shared/lib/hooks/use-toggle'

export const Auth: FC = () => {
  const [auth, handleAuth] = useToggle()
  const { openNotification } = useNotify()

  const onFinish: FormProps<IMainFields>['onFinish'] = (data) => {
    if (!auth && data.password !== data.confirm)
      return openNotification('error', 'Пароли не совпадают', '', 'bottomRight')
  }

  return (
    <StyledFormContainer>
      <Title level={3} style={{ textAlign: 'center' }}>
        {auth ? 'Вход' : 'Регистрация'}
      </Title>
      <Form
        onFinish={onFinish}
        initialValues={{ username: '', password: '', confirm: '' }}
        layout={'vertical'}
      >
        <Form.Item<IMainFields>
          label={'Имя пользователя'}
          name={'username'}
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IMainFields>
          label={'Пароль'}
          name={'password'}
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        {!auth && (
          <Form.Item<IMainFields>
            label={'Подтвердите пароль'}
            name={'confirm'}
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Space style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <StyledForgetPass>
            <Link onClick={handleAuth}>{!auth ? 'Войти' : 'Зарегистрироваться'}</Link>
          </StyledForgetPass>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {auth ? 'Войти в систему' : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </StyledFormContainer>
  )
}
