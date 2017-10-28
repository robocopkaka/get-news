class Users::SessionsController < Devise::SessionsController
  # protect_from_forgery with: :exception, prepend:true
  # clear_respond_to
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    # user = User.find_by(email: params[:email].to_s.downcase)
    #
    # if user && user.authenticate(params[:password])
    #   self.resource = warden.authenticate!(auth_options)
    #   sign_in(resource_name, resource)
    #   yield resource if block_given?
    #   render json: JWTWrapper.encode({user_id:current_user.id})
    # else
    #   render json: {error: 'Invalid username / password'}, status: :unauthorized
    # end
    super
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
