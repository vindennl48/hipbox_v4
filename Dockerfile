FROM ruby:2.5.1

#RUN apk add --update build-base postgresql-dev tzdata nodejs
RUN apt-get update && apt-get -y upgrade && apt-get install -y build-essential nodejs libasound2-dev
RUN gem install rails -v 5.2.0

WORKDIR /app
ADD Gemfile Gemfile.lock /app/
RUN bundle install

ADD . .
CMD ["puma"]
