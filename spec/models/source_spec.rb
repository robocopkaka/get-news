require 'rails_helper'

RSpec.describe Source,type: :model do
  subject {
    described_class.new(name: "kachi", shortcode: "kachi")
  }
  it 'saves the source to the database' do
    expect(subject).to be_valid
  end

  it 'shouldn\'t save a source, if the shortcode isn\'t present' do
    subject.shortcode = nil
    expect(subject).to_not be_valid
  end

  it 'should not save a source if the name is not present' do
    source = subject.name = nil
    expect(subject).to_not be_valid
  end

  it { should validate_uniqueness_of(:shortcode)}
end
