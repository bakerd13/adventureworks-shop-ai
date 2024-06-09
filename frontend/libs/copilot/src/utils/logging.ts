const styleString = (color: string) => `color: ${color}; font-weight: bold`
const headerLog = '%c[copilot]%c'

export const warning = (...args: any) =>
  console.log(headerLog, styleString('orange'), ...args)

export const error = (...args: any) =>
  console.log(headerLog, styleString('red'), ...args)
