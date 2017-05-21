Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api do
    defaults format: :json do
      resources :users,           only: [:create, :show, :update]
      resources :universities,    only: [:index, :show]
      resources :posts,           only: [:index, :create, :show, :update, :destroy]
      resources :courses,         only: [:index, :show]
      resources :categories,      only: [:index, :show]
      resources :search,          only: [:index]
      resources :bookmarks,       only: [:index, :create, :destroy]
      resources :rfps,            only: [:index, :create, :destroy]
    end
  end

  get 'email_confirmation/:token', to: 'emails#confirm_email'
end
