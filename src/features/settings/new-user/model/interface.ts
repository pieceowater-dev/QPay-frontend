export interface INewUserProps {
  open: boolean
  handleModal: () => void
}

export interface INewUserFormArgs {
  name: string
  email: string
  password: string
}
