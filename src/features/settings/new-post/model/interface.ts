export interface INewPostProps {
  open: boolean
  handeOpen: () => void
  item?: INewPostFormArgs
  refetch: () => void
}

export interface INewPostFormArgs {
  name: string
  address: string
  identifier: string
  id?: number
  users?: number[]
}
