Rails.application.routes.draw do
  devise_for :users

  get 'users/interface'

  root 'users#interface'
end
