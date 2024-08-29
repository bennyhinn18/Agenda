# webserver using python
FROM python

WORKDIR /webserver
COPY . /webserver/

EXPOSE 8080
CMD ["python","-m", "http.server", "8080"]