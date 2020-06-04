# frozen_string_literal: true

class PipelinesService
  include HTTParty

  base_uri 'https://api.pipelinedeals.com/api/v3'

  def initialize(query = {})
    @options = {
      query: query.merge({
                           api_key: $API_KEY
                         })
    }
  end

  def fetch(resource)
    self.class.get(resource, @options)
  end
end
