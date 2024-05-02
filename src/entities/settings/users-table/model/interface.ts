export interface IUsersItems {
  id: number
  name: string
  email: string
}

export interface IUsersResponse {
  items: IUsersItems[]
  total: {
    count: number
  }
}
