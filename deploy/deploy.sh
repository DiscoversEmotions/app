# install for builder
npm install
# build
npm run build-prod
# clean
rm -Rf /srv/discovers-emotions-app
# copy the build
mkdir /srv/discovers-emotions-app
cp -r ./build/* /srv/discovers-emotions-app
# install prod packages
npm install
# run the server with pm2
pm2 start process.json
