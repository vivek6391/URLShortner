class UrlsController < ApplicationController
  before_action :set_url, only: [:show, :update, :destroy]

  # GET /urls
  def index
    @urls = Url.all

    render json: @urls
  end

  # GET /urls/1
  def show
    render json: @url
  end

  # POST /urls
  def create
    @url = Url.new(url_params)
    tinyurl = "http://localhost:3000/"+generate_code(10)
    @url.tinyurlstr = tinyurl     
    if Url.exists?(urlstr: @url.urlstr)
        render json: @url.errors, status: :unprocessable_entity
    else
       while Url.exists?(tinyurlstr: @url.tinyurlstr)
	 tinyurl = "http://localhost:3000/"+generate_code(10)
    	 @url.tinyurlstr = tinyurl
       end
       puts 'create outside loop' 
       if @url.save
         render json: @url, status: :created, location: @url
       else
         render json: @url.errors, status: :unprocessable_entity
       end
    end
  end

  # PATCH/PUT /urls/1
  def update
    @urltemp = Url.new(url_params)
    if Url.exists?(tinyurlstr: @urltemp.tinyurlstr)
        render json: @url.errors, status: :unprocessable_entity
    else
      if @url.update(url_params)
        render json: @url
      else
        render json: @url.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /urls/1
  def destroy
    @url.destroy
  end

  def go
    desturl = "http://localhost:3000/" + params[:path]
    puts desturl	
    @url = Url.find_by_tinyurlstr!(desturl)
    redirect_to @url.urlstr
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_url
      @url = Url.find(params[:id])
    end

    def generate_code(number)
      charset = Array('A'..'Z') + Array('a'..'z')
      Array.new(number) { charset.sample }.join
    end

    # Only allow a trusted parameter "white list" through.
    def url_params
      params.require(:url).permit(:urlstr, :tinyurlstr)
    end
end
