module Adapter
	include HTTParty
	class News
		attr_accessor :user

		def initialize(user)
			@sources = user.sources
			@base_url = "https://newsapi.org/v1/articles?source="
			@apikey = Rails.application.secrets.api_key
			@responses = Hash.new
		end

		def get_news
			# @sources.each do |source|
			# 	response = HTTParty.get("https://newsapi.org/v1/articles?source=" + source + "&apikey=" + @apikey)
			# 	@responses[source] = response["articles"][0..4]
			# end
			source = @sources.first
			response = HTTParty.get("https://newsapi.org/v1/articles?source=" + source + "&apikey=" + @apikey)
			@responses[source] = response["articles"][0..4]
			@responses
		end
	end
end
