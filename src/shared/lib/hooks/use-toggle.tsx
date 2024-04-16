import { useState } from 'react'

export const useToggle = (): [boolean, () => void, (value: boolean) => void] => {
  const [state, setState] = useState<boolean>(false)
  const handleState = () => setState((prevState) => !prevState)

  return [state, handleState, setState]
}
