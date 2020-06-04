class DealsController < ApplicationController
  before_action :create_client, only: :index

  def index
    @deals = @service.fetch("/deals.json") rescue []
  end

  private
  def create_client
    @service ||= PipelinesService.new({
      pages: params[:page] || 1,
    })
  end
end
