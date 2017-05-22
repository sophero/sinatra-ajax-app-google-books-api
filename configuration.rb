require 'sinatra'
require 'sinatra/activerecord'
require 'json'

set :database, 'sqlite3:googlebooks.sqlite3'
set :sessions, true

require './app'
require './models'
