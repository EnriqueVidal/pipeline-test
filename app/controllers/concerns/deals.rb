# frozen_string_literal: true

module Deals
  extend ActiveSupport::Concern

  def fetch_deals
    service.fetch("/deals.json")
  rescue StandardError
    []
  end

  def service
    @service ||= PipelinesService.new({
                                        page: params[:page] || 1,
                                        per_page: params[:per_page] || 10
                                      })
  end
end
