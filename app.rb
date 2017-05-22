require 'sinatra'
require 'sinatra/activerecord'
require 'json'

set :database, 'sqlite3:googlebooks.sqlite3'
set :sessions, true

require './models'

get '/' do
    redirect '/search' if session[:user_id]
    erb :index
end

get '/search' do
    redirect '/' if session[:user_id] == nil
    @user = User.find(session[:user_id])
    erb :search
end

post '/create_user' do
    user = User.create(params[:user])
    session[:user_id] = user.id
    redirect '/search'
end

post '/sign_in' do
    user = User.where(username: params[:username])[0]
    redirect '/' if user == nil || user.password != params[:password]
    session[:user_id] = user.id
    redirect '/search'
end

post '/sign_out' do
    session[:user_id] = nil
    redirect '/'
end
