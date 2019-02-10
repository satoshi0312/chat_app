Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
    resources :friendships
    resources :users do
      collection do
        get 'search'
        get 'current'
      end
    end
  end

  resources :messages, only: [:index]
  resources :users do
    collection do
      get 'search'
    end
  end
  root 'messages#index'
end
