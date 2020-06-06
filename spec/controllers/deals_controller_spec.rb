require 'rails_helper'

describe DealsController, type: :controller do
  it "responds with no page param" do
    VCR.use_cassette("deals_root") do
      get :index

      expect(response.media_type).to eq("text/html")
      expect(response).to be_successful
    end
  end

  it "accept page param" do
    VCR.use_cassette("deals_page") do
      get :index, params: { page: 2 }

      expect(response.media_type).to eq("text/html")
      expect(response).to be_successful
    end
  end

  it "failsafe for unrealistic pages" do
    VCR.use_cassette("deals_page_too_big") do
      get :index, params: { page: 10000000 }

      expect(response.media_type).to eq("text/html")
      expect(response).to be_successful
    end
  end
end
