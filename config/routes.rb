Rails.application.routes.draw do
  devise_for :users

  resources :layouts, only: [:new, :destroy, :update, :edit, :show]
  resources :notes,   only: [:index]

  get 'layouts/change'

  root 'layouts#show'
end
