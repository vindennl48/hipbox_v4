Warden::Manager.after_set_user do |user,auth,opts|
  # 30.minutes.from_now fails to work because of gem 'osc-ruby'
  thirty_min_from_now = Time.now + 30*60
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.id"] = user.id
  auth.cookies.signed["#{scope}.expires_at"] = thirty_min_from_now
end

Warden::Manager.before_logout do |user, auth, opts|
  scope = opts[:scope]
  auth.cookies.signed["#{scope}.id"] = nil
  auth.cookies.signed["#{scope}.expires_at"] = nil
end
