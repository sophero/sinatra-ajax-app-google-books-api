require 'sinatra'
require 'sinatra/activerecord'
require 'json'

set :database, 'sqlite3:googlebooks.sqlite3'
set :sessions, true

require './models'

get '/' do
    erb :index
end

post '/create_user' do

end

post '/sign_in' do
    # user = User
    # if params[:password] ==
    #
    # end
end

get '/search' do
    erb :search
end
