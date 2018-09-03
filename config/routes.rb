Rails.application.routes.draw do
  devise_for :users

  post 'layouts/ajax_save'
  post 'layouts/ajax_save_values'
  get 'layouts/ajax_load'

  get 'notes/ajax_get_variables'
  post 'notes/ajax_new'
  post 'notes/ajax_update'

  get 'components/ajax_modal'

  resources :layouts,    only: [:new, :destroy, :update, :edit, :show]
  resources :notes,      only: [:index, :destroy]
  resources :components, only: [:update]

  root 'layouts#show'
end
