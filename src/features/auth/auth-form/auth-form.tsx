import { Button, Form, FormProps, Input, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import { useNotify } from 'app/providers/app'
import { IMainFields } from 'features/auth/auth-form/model/interface'
import { StyledForgetPass, StyledFormContainer } from 'features/auth/auth-form/model/styles'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import axiosInstance from 'shared/api/api-query/api-query'
import { useToggle } from 'shared/lib/hooks/use-toggle'

export const AuthForm: FC = () => {
  const [auth, handleAuth] = useToggle()
  const { openNotification } = useNotify()
  const [_, updateToken] = useCookies(['token'])

  const onFinish: FormProps<IMainFields>['onFinish'] = (data) => {
    if (auth && data.password !== data.confirm) return openNotification('Пароли не совпадают')

    if (auth) {
      axiosInstance
        .post('/auth/registration', { ...data, confirm: undefined })
        .then(() => {
          openNotification('Регистрация прошла успешно', 'success')
          handleAuth()
        })
        .catch(() => {
          openNotification('Что-то пошло не так')
        })
    } else {
      axiosInstance
        .post('/auth/login', data)
        .then((res) => {
          updateToken('token', res.data.token)
        })
        .catch(() => {
          openNotification('Что-то пошло не так')
        })
    }
  }

  return (
    <StyledFormContainer>
      <Title level={3} style={{ textAlign: 'center' }}>
        {!auth ? 'Вход' : 'Регистрация'}
      </Title>
      <Form
        onFinish={onFinish}
        initialValues={{ email: '', password: '', confirm: '' }}
        layout={'vertical'}
      >
        {auth && (
          <Form.Item<IMainFields>
            label={'Имя пользователя'}
            name={'name'}
            rules={[{ required: true, message: 'Введите имя пользователя' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item<IMainFields>
          label={'Почта'}
          name={'email'}
          rules={[{ required: true, message: 'Введите почту' }]}
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

        {auth && (
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
            <Link onClick={handleAuth}>{auth ? 'Войти' : 'Зарегистрироваться'}</Link>
          </StyledForgetPass>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {!auth ? 'Войти в систему' : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </StyledFormContainer>
  )
}
