class Source < ApplicationRecord
  validates_uniqueness_of :shortcode
  validates_presence_of :name, :shortcode
end
