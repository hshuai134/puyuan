#!/bin/bash
npm run build
docker-compose build --force-rm
docker push 192.168.1.220:5000/hopeshow_wcsflow:latest
curl -X PUT \
    -H "Content-Type: application/yaml" \
    -H "Cookie: KuboardUsername=admin; KuboardAccessKey=rhyjdskab6z6.e36pbkd7w4nwis3n3jkxjpmk2tj5zrjz" \
    -d '{"kind":"deployments","namespace":"wcsflow","name":"wcsflow"}' \
    "http://192.168.1.220:81/kuboard-api/cluster/hopeshow/kind/CICDApi/admin/resource/restartWorkload"