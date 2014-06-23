xml2json-service
================

see https://registry.hub.docker.com/u/mainiak/xml2json-service/

```
IN="mainiak/xml2json-service"
CN="xml2json_service"
docker pull $IN
docker run --name="$CN" -p 9000:8000 -d $IN
# http://<docker_ip>:9000/
docker stop $CN
```

Post url to XML file and await JSON reply.

If you have networking issues, try diagnostics with https://github.com/mainiak/diag-service
