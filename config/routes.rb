Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create, :show]
    resources :friendships
    resources :users do
      collection do
        get 'search'
        get 'current'
        get 'friends'
      end
    end
  end

  resources :messages, only: [:index]
  resources :friendships, only: [:create, :destroy]
  resources :users do
    collection do
      get 'search'
    end
  end
  root 'messages#index'
end
