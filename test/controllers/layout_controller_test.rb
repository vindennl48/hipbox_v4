require 'test_helper'

class LayoutControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get layout_new_url
    assert_response :success
  end

  test "should get change" do
    get layout_change_url
    assert_response :success
  end

  test "should get destroy" do
    get layout_destroy_url
    assert_response :success
  end

  test "should get update" do
    get layout_update_url
    assert_response :success
  end

end
