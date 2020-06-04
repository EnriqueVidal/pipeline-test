# frozen_string_literal: true

$API_KEY = case key = ENV['API_KEY']
           when nil then raise StandardError, 'You need to set the API_KEY ENV var'
           else
             key
           end
