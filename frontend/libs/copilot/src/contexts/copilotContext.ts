import * as React from 'react'

export interface ICopilotContext {
  actionSheet(): { showActionSheetWithOptions: (option?: any, cb?: any) => any }
  getLocale(): string
}

export const CopilotContext = React.createContext<ICopilotContext>({
  getLocale: () => 'en',
  actionSheet: () => ({
    showActionSheetWithOptions: () => {},
  }),
})

export const useCopilotContext = () => React.useContext(CopilotContext)
