Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api do
    defaults format: :json do
      resources :users, only: [:create, :show, :update]
      resources :universities, only: [:index, :show]
      resources :posts, only: [:index, :create, :show, :update]
      resources :courses, only: [:index, :show]
      resources :categories, only: [:index, :show]
    end
  end
end
