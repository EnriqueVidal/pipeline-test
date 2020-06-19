# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :deals, only: [] do
        get '/(:page)(/:per_page)', to: 'deals#index', format: :json
      end
    end
  end

  get "/(:page)", to: "deals#index"
end
