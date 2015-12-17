#! /bin/bash

coffee -cmw demo.coffee &
scss --watch --sourcemap demo.scss:demo.css &
echo 'Watching Coffee and SCSS the bare-bones way… Press Return to kill watchers.'
read
ps | grep -Ei 'coffee|scss' | grep -Ei 'coffee|scss' | xargs kill 2> /dev/null
rm demo.css demo.css.map demo.js demo.map
rm -rf .sass-cache
