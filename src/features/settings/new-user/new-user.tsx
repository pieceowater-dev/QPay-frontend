import { Button, Drawer, Form, FormProps, Input } from 'antd'
import { useNotify } from 'app/providers/app'
import { INewUserFormArgs, INewUserProps } from 'features/settings/new-user/model/interface'
import React, { FC, useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'

export const NewUser: FC<INewUserProps> = ({ open, handleModal, item, refetch }) => {
  const { openNotification } = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish: FormProps<INewUserFormArgs>['onFinish'] = async (data) => {
    setLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id) {
        await axiosInstance.patch(`/users/${item.id}`, data).then(() => {
          openNotification('Пользователь изменен', 'success')
          handleModal()
          refetch()
          setLoading(false)
        })
      } else {
        await axiosInstance.post('/users', data).then(() => {
          openNotification('Пользователь создан', 'success')
          handleModal()
          refetch()
          setLoading(false)
        })
      }
    } catch (error) {
      openNotification('Что-то пошло не так')
      setLoading(false)
    }
  }

  useEffect(() => {
    form.resetFields()
  }, [item, open])

  return (
    <Drawer title='Создание нового пользователя' onClose={handleModal} open={open}>
      <Form
        form={form}
        onFinish={onFinish}
        layout={'vertical'}
        initialValues={{
          name: item?.name || '',
          email: item?.email || '',
          password: item ? item?.password : undefined,
        }}
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
          rules={[{ required: !item, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ position: 'absolute', bottom: -10, left: 24 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
