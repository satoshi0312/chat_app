Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :messages
  resources :users do
    collection do
      get 'search'
    end
  end
  root 'messages#index'
end
