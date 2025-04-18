export interface InitState {
  isFirstLogin: boolean;
}

export interface InitStore extends InitState {
  setIsFirstLogin: (isAuthenticated: boolean) => void;
}
