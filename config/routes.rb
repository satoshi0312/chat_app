Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create, :show] do
      collection do
        post 'upload'
      end
    end
    resources :friendships, only: [:show]
    resources :users, only: [] do
      collection do
        get 'search'
        get 'current'
        get 'friends'
      end
    end
  end

  resources :messages, only: [:index]
  resources :friendships, only: [:create, :destroy]
  resources :users, only: [:show]
  root 'messages#index'
end
