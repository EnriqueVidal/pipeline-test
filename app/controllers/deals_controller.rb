# frozen_string_literal: true

class DealsController < ApplicationController
  include Deals

  def index
    @deals = fetch_deals
  end
end
