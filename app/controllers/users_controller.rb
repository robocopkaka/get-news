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

  def update
    respond_to do |format|
      if @user.update_attributes(user_params)
        redirect_to @user
      else
        render 'edit'
      end
    end
  end

  #randomly get news sources and call get_news from the adapter
  def read_news
  end

  def add_source
    @user = User.find_by_id(params[:id])
    @user.sources
  end

  private
  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:user).require(:email, :password, :password_confirmation)
  end
end
