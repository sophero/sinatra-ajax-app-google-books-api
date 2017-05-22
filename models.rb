class User < ActiveRecord::Base
    has_many :books
    validates :username, uniqueness: true
    validates_presence_of :username, :email, :password
end

class Book < ActiveRecord::Base
    belongs_to :user
end
