class SourcesController < ApplicationController
  def index
    @sources = Source.all
    respond_to do |format|
      format.html
      format.json{render json: @sources}
    end
  end

  def new
    @source = Source.new
  end

  def create
    @source = Source.new(source_params)
  end

  def edit
  end

  def update
  end

  private
  def source_params
    params.require(:source).permit(:name, :logo, :shortcode)
  end
end
