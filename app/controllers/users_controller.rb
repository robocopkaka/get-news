class UsersController < ApplicationController
  before_action :find_user, only: [:show,:edit, :update]
  # before_action authenticate_user!
  def show
    if @user.sources.nil?
      render 'sources/select_sources'
    else
      render 'user_sources'
    end
  end

  #randomly get news sources and call get_news from the adapter
  def read_news
  end

  def add_source

  end

  private
  def find_user
    @user = User.find(params[:id])
  end
end
