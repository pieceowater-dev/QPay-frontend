export interface INewUserProps {
  open: boolean
  handleModal: () => void
  item?: INewUserFormArgs
}

export interface INewUserFormArgs {
  name: string
  email: string
  password: string
  id?: number
}
