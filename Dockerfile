FROM node:14.4.0-alpine

# 省略した書き方。Herokuの場合適用されない
# ARG WORKDIR \
#     CONTAINER_PORT \
#     API_URL \
#     API_KEY \
#     AUTH_DOMAIN \
#     PROJECT_ID \
#     APP_ID \
#     STORAGE_BUCKET \
#     MESSAGE_SENDER_ID \
#     GM_API_KEY \
#     GUEST_EMAIL \
#     GUEST_UID \
#     GUEST_PASS

ARG WORKDIR 
ARG CONTAINER_PORT 
ARG API_URL 
ARG API_KEY
ARG AUTH_DOMAIN 
ARG PROJECT_ID 
ARG APP_ID 
ARG STORAGE_BUCKET 
ARG MESSAGE_SENDER_ID 
ARG GM_API_KEY 
ARG GUEST_EMAIL 
ARG GUEST_UID 
ARG GUEST_PASS

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}\
    API_KEY=${API_KEY} \
    AUTH_DMAIN=${AUTH_DMAIN} \
    PROJECT_ID=${PROJECT_ID} \
    APP_ID=${APP_ID} \
    STORAGE_BUCKET=${STORAGE_BUCKET} \
    MESSAGE_SENDER_ID=${MESSAGE_SENDER_ID} \
    GM_API_KEY=${GM_API_KEY} \
    GUEST_EMAIL=${GUEST_EMAIL} \
    GUEST_UID=${GUEST_UID} \
    GUEST_PASS=${GUEST_PASS}


# ENV check（このRUN命令は確認のためなので無くても良い）
RUN echo ${HOME}
RUN echo ${CONTAINER_PORT}
RUN echo ${API_URL}
RUN echo ${API_KEY}

WORKDIR ${HOME}

COPY package*.json ./
RUN yarn install

COPY . ./

RUN yarn run build

EXPOSE ${CONTAINER_PORT}