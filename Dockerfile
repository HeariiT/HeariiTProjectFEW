FROM node:6.11.3

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/Store
RUN mkdir $HOME
WORKDIR $HOME

RUN npm install -g @angular/cli@latest
COPY package.json $HOME/package.json
RUN npm install && npm cache clean
RUN npm install --save @angular/material @angular/cdk
RUN npm install --save angular/material2-builds angular/cdk-builds
RUN npm install --save @angular/animations
RUN npm install --save hammerjs
RUN npm install file-saver --save
RUN npm install @types/file-saver --save
COPY . /Store

EXPOSE 7000
EXPOSE 49152

CMD ["ng", "serve", "--port 7000 --host=0.0.0.0"]
