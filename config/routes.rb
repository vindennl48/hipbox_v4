Rails.application.routes.draw do
  devise_for :users

  resources :layouts, only: [:new, :destroy, :update, :edit, :show]
  resources :notes,   only: [:index, :destroy]

  root 'layouts#show'
end
