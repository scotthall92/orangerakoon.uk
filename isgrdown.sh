#!/bin/bash

date=$(date)
status='down'

if ping -q -c 1 grcade.co.uk ; then
    status='up'
fi

sed -i "s/^<h1>GRcade is.*/<h1>GRcade is ${status}<\/h1>/" /var/www/orangerakoon.uk/public_html/isgrdown.html
sed -i "s/^<i>Last checked.*/<i>Last checked ${date}<\/i>/" /var/www/orangerakoon.uk/public_html/isgrdown.html
