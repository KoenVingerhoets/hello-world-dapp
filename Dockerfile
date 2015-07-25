FROM eris/decerver:latest
MAINTAINER Eris Industries <support@erisindustries.com>

USER root

COPY . $ERIS/dapps/helloworld/
RUN chown $USER -R $ERIS/dapps/helloworld/

USER $USER

CMD $ERIS/dapps/helloworld/start.sh
