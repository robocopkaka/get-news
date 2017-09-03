class HomesController < ApplicationController
  def index
  	@hook = Adapter::News.new(User.first)
  	@news = @hook.get_news
  end

  def news
    @hook = Adapter::News.new(User.first)
  	@news = @hook.get_news
  end
end
