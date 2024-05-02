import { Button, Drawer, Form, FormProps, Input } from 'antd'
import { useNotify } from 'app/providers/app'
import { INewUserFormArgs, INewUserProps } from 'features/settings/new-user/model/interface'
import React, { FC } from 'react'
import axiosInstance from 'shared/api/api-query/api-query'

export const NewUser: FC<INewUserProps> = ({ open, handleModal }) => {
  const { openNotification } = useNotify()

  const onFinish: FormProps<INewUserFormArgs>['onFinish'] = (data) => {
    axiosInstance
      .post('/users', data)
      .then(() => {
        openNotification('Пользователь создан', 'success')
        handleModal()
      })
      .catch(() => {
        openNotification('Что-то пошло не так')
      })
  }

  return (
    <Drawer title='Создание нового пользователя' onClose={handleModal} open={open}>
      <Form
        onFinish={onFinish}
        layout={'vertical'}
        initialValues={{ name: '', email: '', password: '' }}
        style={{ height: '100%' }}
      >
        <Form.Item<INewUserFormArgs>
          label={'Имя пользователя'}
          name={'name'}
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<INewUserFormArgs>
          label={'Почта'}
          name={'email'}
          rules={[{ required: true, message: 'Введите почту' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<INewUserFormArgs>
          label={'Пароль'}
          name={'password'}
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ position: 'absolute', bottom: -10, left: 24 }}>
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
