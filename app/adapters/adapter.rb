module Adapter
	include HTTParty
	class News
		attr_accessor :user

		def initialize(user)
			@sources = user.sources
			@base_url = "https://newsapi.org/v1/articles?source="
			@results = []
			@responses = Hash.new
		end

		def get_news
			@sources.each do |source|
				response = HTTParty.get("https://newsapi.org/v1/articles?source=" + source + "&apikey=" + Rails.application.secrets.api_key)
				@responses[source] = response["articles"]
			end
			@responses
		end
	end
end