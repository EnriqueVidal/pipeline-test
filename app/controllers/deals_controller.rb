# frozen_string_literal: true

class DealsController < ApplicationController
  before_action :service, only: :index

  def index
    @deals = begin
               service.fetch('/deals.json')
             rescue StandardError
               []
             end
  end

  private

  def service
    @service ||= PipelinesService.new({
                                        pages: params[:page] || 1
                                      })
  end
end
