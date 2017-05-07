Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'
  namespace :api do
    resources :users, only: [:create, :show, :update]
    resources :universities, only: [:index, :show]
    resources :posts, only: [:index, :create, :show, :update]
    resources :courses, only: [:index, :show]
    resources :categories, only: [:index, :show]
  end
end
