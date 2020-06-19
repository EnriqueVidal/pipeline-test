require 'rails_helper'

describe 'PipelinesService' do
  subject { PipelinesService.new page: 1, per_page: 5 }

  describe 'contructor' do
    it { expect(subject.safe_query).to include(:page) }
    it { expect(subject.safe_query).to include(:per_page) }
    it { expect(subject.safe_query).to_not include(:api_key) }
  end

  describe 'fetching' do
    before do
      VCR.use_cassette("pipeline_service") do
        @response = JSON.parse(
          subject.fetch("/deals.json").body
        ).with_indifferent_access
      end
    end

    describe "entries" do
      it { expect(@response).to include(:entries) }
      it { expect(@response[:entries].length).to equal(5) }
    end

    describe "pagination" do
      it { expect(@response).to include(:pagination) }
      it { expect(@response[:pagination][:page]).to equal(1) }
      it { expect(@response[:pagination][:per_page]).to equal(5) }
    end
  end
end
