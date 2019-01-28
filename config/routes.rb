Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :messages
  root 'messages#index'
end
