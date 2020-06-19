# frozen_string_literal: true

module Api
  module V1
    class DealsController < ApplicationController
      include Deals

      def index
        render json: fetch_deals
      end
    end
  end
end
