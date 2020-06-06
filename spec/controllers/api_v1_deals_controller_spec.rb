require 'rails_helper'

module Api
  module V1
    describe DealsController do
      shared_examples_for "no_limit" do
        it { expect(@response).to include(:entries) }
        it { expect(@response[:entries].length).to eq(10) }
      end

      shared_examples_for "no_page" do
        it { expect(@response).to include(:pagination) }
        it { expect(@response[:pagination][:page]).to eq(1) }
      end

      shared_examples_for "with_page" do
        it { expect(@response).to include(:pagination) }
        it { expect(@response[:pagination][:page]).to eq(page) }
      end

      shared_examples_for "with_limit" do
        it { expect(@response).to include(:entries) }
        it { expect(@response[:entries].length).to eq(limit) }
        it { expect(@response[:pagination][:per_page]).to eq(limit) }
      end

      describe "no params" do
        it_behaves_like "no_limit"
        it_behaves_like "no_page"

        before do
          VCR.use_cassette("deals_api_root") do
            get :index

            expect(response).to be_successful
            expect(response.media_type).to eq("application/json")

            @response = JSON.parse(response.body).with_indifferent_access
          end
        end
      end

      describe "page param" do
        it_behaves_like "no_limit"
        it_behaves_like "with_page"

        let(:page) { 2 }

        before do
          VCR.use_cassette("deals_api_page") do
            get :index, params: { page: page }

            expect(response).to be_successful
            expect(response.media_type).to eq("application/json")

            @response = JSON.parse(response.body).with_indifferent_access
          end
        end
      end

      describe "per_page param" do
        it_behaves_like "with_page"
        it_behaves_like "with_limit"

        let(:page) { 1 }
        let(:limit) { 5 }

        before do
          VCR.use_cassette("deals_api_per_page") do
            get :index, params: { page: page, per_page: limit }

            expect(response).to be_successful
            expect(response.media_type).to eq("application/json")

            @response = JSON.parse(response.body).with_indifferent_access
          end
        end
      end
    end
  end
end
