FROM public.ecr.aws/docker/library/node:24-alpine

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.1.0 \
  /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=8080
ENV AWS_LWA_PORT=8080
ENV NODE_ENV=production

WORKDIR /var/task

COPY app/ ./
COPY bootstrap.js ./

CMD ["node", "bootstrap.js"]
