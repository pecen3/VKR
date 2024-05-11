
FROM postgres:13


COPY db.sql /docker-entrypoint-initdb.d/


COPY database_dump.sql /docker-entrypoint-initdb.d/


ENV POSTGRES_DB=test


EXPOSE 5432


CMD ["postgres"]