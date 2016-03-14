#!/usr/bin/env bash

# Change to project directory
cd /vagrant

# Install project dependencies through Bower
bower install angular-route#1.4.6
bower install angularjs-geolocation#0.1.1
bower install bootstrap#3.3.5
bower install holderjs
bower install modernizr#3.0.0

# Install Node.js dependencies using Node Package Manager
npm install
