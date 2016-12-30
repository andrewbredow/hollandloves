require "dotenv"
require "pry"

Dotenv.load

desc "Build the site"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

task :renew_ssl do
  tmp = Dir.tmpdir
  command = %{
  AWS_ACCESS_KEY_ID="#{ENV["AWS_ACCESS_KEY_ID"]}" \
  AWS_SECRET_ACCESS_KEY="#{ENV["AWS_SECRET_ACCESS_KEY"]}" \
  certbot --agree-tos -a certbot-s3front:auth \
  --logs-dir #{tmp} \
  --config-dir #{tmp} \
  --work-dir #{tmp} \
  --certbot-s3front:auth-s3-bucket #{ENV["S3_BUCKET"]} \
  -i certbot-s3front:installer \
  --certbot-s3front:installer-cf-distribution-id #{ENV["CF_DISTRIBUTION_ID"]} \
  -d hollandloves.org
  }
  system command
end

desc "Push the site to S3"
task :deploy => [:build] do
  system "bundle exec s3_website push --force"
end
