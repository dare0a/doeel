#!/bin/bash
token="6ae7e380b233f008df02043beac83f47898cb791"

#curl https://api.todoist.com/sync/v8/completed/get_all -d token=${token}
curl -X GET https://api.todoist.com/rest/v1/projects -H "Authorization: Bearer ${token}"


#echo "Authorization: Bearer ${token}"


