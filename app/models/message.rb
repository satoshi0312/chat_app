class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :friendship
mount_uploader :image, ImageUploader
end
