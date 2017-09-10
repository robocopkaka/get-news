Rails.application.routes.draw do
  get 'homes/index'
  root to: 'homes#index'
  get 'users/add_source'

  devise_for :users, controllers: {registrations: 'users/registrations'}

  resources :users
  resources :sources
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
