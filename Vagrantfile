# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
apt-get install -qqy git
apt-get install -qqy build-essential
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -qqy nodejs
npm install -g bower
SCRIPT

$bower = <<BOWER
cd /vagrant
bower install angular-route#1.4.6
bower install angularjs-geolocation#0.1.1
bower install bootstrap#3.3.5
bower install modernizr#3.0.0
BOWER

Vagrant.configure(2) do |config|
  config.hostmanager.enabled = true
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "mapapp"
  config.vm.network :private_network, ip: "172.22.33.44"
  config.vm.provider :virtualbox do |v|
    v.name = "mapapp"
    v.memory = 1024
  end
  config.vm.provision "shell", inline: $script
  config.vm.provision "shell", inline: $bower, privileged: false
end