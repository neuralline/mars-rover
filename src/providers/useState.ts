export const useState = <T>(
  initialState: T
): [state: () => T, setState: (newValue: any) => void] => {
  let _secret: T = initialState

  const state = (): T => {
    return _secret
  }

  const setState = (newValue: T): void => {
    _secret = newValue
  }

  return [state, setState]
}
