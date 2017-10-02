class UsersController < ApplicationController
  before_action :find_user, only: [:show,:edit, :update]

  def create
    user = User.new(user_params)

    if user.save
      render json: {status: 'User created successfully'}, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end
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
    @user = User.find_by_id(params[:id])
    @user.sources
  end

  def login
    user = User.find_by(email: params[:email].to_s.downcase)

    if user && user.authenticate(params[:password])
        auth_token = JsonWebToken.encode({user_id: user.id})
        render json: {auth_token: auth_token}, status: :ok
    else
      render json: {error: 'Invalid username / password'}, status: :unauthorized
    end
  end

  private
  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
