#!/usr/bin/env bash

apt-get update -qqy

#--- Git ---#
apt-get install -qqy git

#--- Build Essentials ---#
apt-get install -qqy build-essential

#--- Node.js ---#
curl -sL https://deb.nodesource.com/setup_5.x | bash
apt-get install -qqy nodejs

#--- Bower ---#
npm install -g bower

#--- MongoDB ---#
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update -qqy
apt-get install -qqy mongodb-org
