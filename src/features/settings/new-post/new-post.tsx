import { Button, Drawer, Form, FormProps, Input, Select } from 'antd'
import { useNotify } from 'app/providers/app'
import {
  INewPostFormArgs,
  INewPostProps,
  IUsersForPostsResponse,
} from 'features/settings/new-post/model/interface'
import React, { FC, useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const NewPost: FC<INewPostProps> = ({ open, handeOpen, item, refetch }) => {
  const { openNotification } = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [tokenLoading, setTokenLoading] = useState(false)
  const [token, setToken] = useState('')

  const options = useAppSelector((state) => state.settings.users)

  const fetchToken = async () => {
    setTokenLoading(true)

    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id)
        await axiosInstance.post('/post-token', { postId: item.id }).then((res) => {
          setTokenLoading(false)
          setToken(res.data.token)
        })
    } catch (error) {
      openNotification('Что-то пошло не так')
    }
  }

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id)
        await axiosInstance.get(`/posts-users-access/post/${item.id}`).then((res) => {
          form.setFieldValue(
            'users',
            res.data.map((item: IUsersForPostsResponse) => {
              return {
                label: item.user.name,
                value: item.id,
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
    if (open) fetchData()
  }, [item, open])

  const onFinish: FormProps<INewPostFormArgs>['onFinish'] = async (data) => {
    setLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id) {
        const users = data.users
          ? data.users.map((user) => {
              return {
                post: item.id,
                user: user,
              }
            })
          : []
        await axiosInstance.patch(`/posts/${item.id}`, data).then(() => {
          openNotification('Пост изменен', 'success')
          handeOpen()
          refetch()
          setLoading(false)
        })
        await axiosInstance.post('/posts-users-access', users)
      } else {
        await axiosInstance.post('/posts', data).then(() => {
          openNotification('Пост создан', 'success')
          handeOpen()
          refetch()
          setLoading(false)
        })
      }
    } catch (error) {
      openNotification('Что-то пошло не так')
      setLoading(false)
    }
  }

  return (
    <>
      <Drawer title='Создание нового поста' onClose={handeOpen} open={open}>
        <Form
          form={form}
          onFinish={onFinish}
          layout={'vertical'}
          initialValues={{
            name: item?.name || '',
            address: item?.address || '',
            bin: item?.bin || '',
          }}
          style={{ height: '100%' }}
        >
          <Form.Item<INewPostFormArgs>
            label={'Имя поста'}
            name={'name'}
            rules={[{ required: true, message: 'Введите имя поста' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<INewPostFormArgs>
            label={'Адрес'}
            name={'address'}
            rules={[{ required: true, message: 'Введите адрес' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<INewPostFormArgs>
            label={'БИН'}
            name={'bin'}
            rules={[{ required: true, message: 'Введите бин' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item<INewPostFormArgs>*/}
          {/*  label={'Индификатор'}*/}
          {/*  name={'identifier'}*/}
          {/*  rules={[{ required: true, message: 'Введите Индификатор' }]}*/}
          {/* >*/}
          {/*  <Input />*/}
          {/* </Form.Item>*/}

          <Form.Item<INewPostFormArgs> label={'Пользователи'} name={'users'}>
            <Select
              mode={'multiple'}
              allowClear={true}
              style={{ width: '100%', marginTop: 5 }}
              options={options}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type='primary' htmlType='submit' loading={loading}>
                Сохранить
              </Button>

              <Button type='primary' onClick={fetchToken} loading={tokenLoading}>
                Получить токен
              </Button>
            </div>
          </Form.Item>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>Токен показывается только 1 раз, затем генерируется новый</div>
            <Input value={token} disabled={true} />
            <Button
              type='primary'
              onClick={() => {
                navigator.clipboard.writeText(token)
                openNotification('Токен скопирован', 'success')
              }}
            >
              Скопировать
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  )
}
