import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import PreferrenceStorage from './preferrenceStorage';
import GetUser from '../hooks/getUser';
import { UserDTO } from '../types/messages';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export enum LayoutEnum {
  Stacked = 'stacked',
  Staggered = 'staggered',
}

export type LayoutType = LayoutEnum.Stacked | LayoutEnum.Staggered;

export type PreferenceState = {
  user: UserDTO;
  theme: ThemeEnum;
  layout: LayoutType;
  setTheme: (theme: ThemeEnum) => void;
  setLayout: (layout: LayoutType) => void;
  setHydrate: ({ user, theme, layout }: { user: UserDTO; theme: ThemeEnum; layout: LayoutType; }) => void;
};

export const usePreferenceStore = create<PreferenceState>()(
  devtools(
    persist(
      (set, get) => ({
        user: {},
        theme: ThemeEnum.Light,
        layout: LayoutEnum.Stacked,
        setTheme: (theme: ThemeEnum) => {
          set((state) => ({
            theme,
          }));
        },
        setLayout: (layout: LayoutType) => {
          set((state) => ({
            layout,
          }));
        },
        setHydrate: async ({ user, theme, layout }: { user: UserDTO; theme: ThemeEnum; layout: LayoutType; }) => {
          if (!user?.id) {
            const userResponse = await GetUser(uuidv4());
            user = userResponse;
          }
          set((state) => ({
            user,
            theme,
            layout,
          }));
        },
      }),
      {
        name: 'PreferenceStore',
        storage: createJSONStorage(() => PreferrenceStorage),
        partialize: (state) => ({ user: state.user, theme: state.theme, layout: state.layout }),
        onRehydrateStorage: (state) => {
          // optional
          return (state, error) => {
            if (!error) {
              state?.setHydrate({ user: state.user, theme: state.theme, layout: state.layout });
            }
          }
        },
      }
    )
  )
);

export  default usePreferenceStore;
