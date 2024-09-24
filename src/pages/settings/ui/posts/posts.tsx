import { Button, Flex, Table } from 'antd'
import { usePostsTable } from 'entities/settings/posts-table'
import { NewPost } from 'features/settings/new-post'
import { FC } from 'react'

export const Posts: FC = () => {
  const {
    handlePostModal,
    postModal,
    setCurrentPost,
    totalPosts,
    posts,
    fetchData,
    columns,
    currentPost,
  } = usePostsTable()

  return (
    <div style={{ minHeight: 350 }}>
      <Flex gap={'10px'} align={'center'} style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '28px' }}>Посты</div>
        <Button
          type={'primary'}
          onClick={() => {
            setCurrentPost(undefined)
            handlePostModal()
          }}
        >
          +
        </Button>
      </Flex>

      <Table
        scroll={{
          x: 'max-content',
        }}
        columns={columns}
        dataSource={posts}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        pagination={{
          total: totalPosts,
        }}
      />

      <NewPost
        open={postModal}
        handeOpen={handlePostModal}
        refetch={fetchData}
        item={currentPost}
      />
    </div>
  )
}
