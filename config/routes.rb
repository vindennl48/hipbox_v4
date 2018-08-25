Rails.application.routes.draw do
  devise_for :users

  get 'users/interface'
  get 'users/new_layout'
  get 'users/change_layout'
  get 'users/remove_layout'

  root 'users#interface'

end
