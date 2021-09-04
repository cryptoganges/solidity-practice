FROM ubuntu:20.04

ENV TZ=US/Mountain
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update -y && \
apt-get install -y git && \
apt-get install -y nodejs npm && \
npm install -g truffle@5.4.9 && \
npm install -g ganache-cli@6.12.2 && \
apt-get clean -y