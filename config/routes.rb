Rails.application.routes.draw do
  resources :urls
  #get '*path' => redirect('/')
  get '*path' => 'urls#go'
  get '/' => 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
