import { Button, Drawer, Form, FormProps, Input, Select } from 'antd'
import { useNotify } from 'app/providers/app'
import { INewPostFormArgs, INewPostProps } from 'features/settings/new-post/model/interface'
import { INewUserFormArgs } from 'features/settings/new-user/model/interface'
import React, { FC, useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const NewPost: FC<INewPostProps> = ({ open, handeOpen, item, refetch }) => {
  const { openNotification } = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const options = useAppSelector((state) => state.settings.users)

  useEffect(() => {
    form.resetFields()
  }, [item, open])

  const onFinish: FormProps<INewPostFormArgs>['onFinish'] = async (data) => {
    setLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()
      if (item && item.id) {
        await axiosInstance.patch(`/posts/${item.id}`, data).then(() => {
          openNotification('Пост изменен', 'success')
          handeOpen()
          refetch()
          setLoading(false)
        })
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
    <Drawer title='Создание нового поста' onClose={handeOpen} open={open}>
      <Form
        form={form}
        onFinish={onFinish}
        layout={'vertical'}
        initialValues={{
          name: item?.name || '',
          address: item?.address || '',
          identifier: item?.identifier || '',
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
          label={'Индификатор'}
          name={'identifier'}
          rules={[{ required: true, message: 'Введите Индификатор' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<INewUserFormArgs> label={'Посты'} name={'posts'}>
          <Select
            mode={'multiple'}
            allowClear={true}
            style={{ width: '100%', marginTop: 5 }}
            options={options}
          />
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
