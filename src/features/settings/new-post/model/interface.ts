export interface INewPostProps {
  open: boolean
  handeOpen: () => void
  item?: INewPostFormArgs
  refetch: () => void
}

export interface INewPostFormArgs {
  name: string
  address: string
  bin: string
  id?: number
  users?: number[]
}

export interface IUsersForPostsResponse {
  id: number
  user: {
    id: number
    name: string
  }
}
