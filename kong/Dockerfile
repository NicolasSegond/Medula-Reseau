FROM kong:3.6

USER root

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY kong.yml /usr/local/kong/kong.yml

USER kong

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["kong", "docker-start"]
