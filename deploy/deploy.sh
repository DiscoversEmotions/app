# install for builder
yarn install
# build
yarn run build-prod
# clean
rm -Rf /srv/remember-experiment
# copy the build
mkdir /srv/remember-experiment
cp -r ./build/* /srv/remember-experiment
# move
cd /srv/remember-experiment
# install prod packages
yarn install
# run the server with pm2
pm2 start process.json
