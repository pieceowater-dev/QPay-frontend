import { Button, Drawer, Form, FormProps, Input, Select } from 'antd'
import { useNotify } from 'app/providers/app'
import {
  INewUserFormArgs,
  INewUserProps,
  IPostsForUsersResponse,
} from 'features/settings/new-user/model/interface'
import React, { FC, useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const NewUser: FC<INewUserProps> = ({ open, handleModal, item, refetch }) => {
  const { openNotification } = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const options = useAppSelector((state) => state.settings.posts)

  const onFinish: FormProps<INewUserFormArgs>['onFinish'] = async (data) => {
    setLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id) {
        await axiosInstance
          .patch(`/users/${item.id}`, {
            ...data,
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password ? data.password.trim() : undefined,
          })
          .then(() => {
            openNotification('Пользователь изменен', 'success')
            handleModal()
            refetch()
            setLoading(false)
          })
        await axiosInstance.patch(`/posts-users-access/user/${item.id}`, {
          posts: data.posts?.map((pst) => pst.value),
        })
      } else {
        await axiosInstance
          .post('/users', {
            ...data,
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password ? data.password.trim() : undefined,
          })
          .then((res) => {
            console.log(res)
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

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id)
        await axiosInstance.get(`/posts-users-access/user/${item.id}`).then((res) => {
          form.setFieldValue(
            'posts',
            res.data.map((item: IPostsForUsersResponse) => {
              return {
                label: item.post.name,
                value: item.post.id,
              }
            }),
          )
        })
    } catch (error) {
      openNotification('Что-то пошло не так')
    }
  }

  useEffect(() => {
    form.resetFields()
    fetchData()
  }, [item, open])

  return (
    <Drawer
      title={item ? 'Изменение пользователя' : 'Создание нового пользователя'}
      onClose={handleModal}
      open={open}
    >
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

        <Form.Item<INewUserFormArgs> label={'Посты'} name={'posts'}>
          <Select
            mode={'multiple'}
            allowClear={true}
            style={{ width: '100%', marginTop: 5 }}
            options={options}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
