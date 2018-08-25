Rails.application.routes.draw do
  devise_for :users

  resources :layouts, only: [:new, :destroy, :update, :edit, :show]
  get 'layouts/change'

  root 'layouts#show'
end
