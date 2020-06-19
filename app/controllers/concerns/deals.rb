# frozen_string_literal: true

module Deals
  extend ActiveSupport::Concern

  FALLBACK_RESPONSE = {
    entries: [],
    pagination: {
      page: 0,
      per_page: 10,
      pages: 0,
      total: 0
    }
  }.freeze

  def fetch_deals
    service.fetch("/deals.json")
  rescue StandardError
    FALLBACK_RESPONSE
  end

  def service
    @service ||= PipelinesService.new({
                                        page: params[:page] || 1,
                                        per_page: params[:per_page] || 10
                                      })
  end
end
