Rails.application.routes.draw do
  devise_for :users

  resources :layouts, only: [:new, :destroy, :update]
  get 'layouts/change'

  get 'users/interface'

  root 'users#interface'
end
