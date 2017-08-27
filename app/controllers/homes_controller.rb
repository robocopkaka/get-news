class HomesController < ApplicationController
  def index
  	@hook = Adapter::News.new(User.first)
  	@news = @hook.get_news
  end
end
