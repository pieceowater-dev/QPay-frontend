export interface INewUserProps {
  open: boolean
  handleModal: () => void
  item?: INewUserFormArgs
  refetch: () => void
}

export interface INewUserFormArgs {
  name: string
  email: string
  password: string
  id?: number
  posts?: number[]
}
