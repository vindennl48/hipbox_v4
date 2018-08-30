class Note < ApplicationRecord
  validates :variable, uniqueness: true
  validates :osc, uniqueness: true
end
