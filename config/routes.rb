Rails.application.routes.draw do
  devise_for :users

  resources :layouts,    only: [:new, :destroy, :update, :edit, :show]
  resources :notes,      only: [:index, :destroy]
  resources :components, only: [:update]

  root 'layouts#show'
end
