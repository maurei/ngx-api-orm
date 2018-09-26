
# Default API response example
### this page is still under construction.

```json
POST /employees HTTP/1.1
HTTP
[
	{
		"id": 1,
		"firstName": "first",
		"familyName": "middle",
		"team": {
			"id": 9,
			"teamName": "IT"
		},
		"tasks": [],
	},
	{
		"id": 2,
		"firstName": "first",
		"familyName": "middle",
		"team": {
			"id": 11,
			"teamName": "finance"
		},
		"tasks": [{ "id": 20, "title": "some work item"}, { "id": 21, "title": "another work item"}],
	},
	{
		"id": 3,
		"firstName": "first",
		"familyName": "middle",
		"team": "null",
		"tasks": [{ "id": 20, "title": "some work item"}, { "id": 22 , "title": "more work"}]
	}
]
```
#### Gettings nested tasks
```json
GET /employees/1/tasks HTTP/1.1
HTTP
[
    {
        "id": 20,
        "title": "some work item"
    },
    {
        "id": 21,
        "title": "another work item"
    }
]
```


# Default API response examples with key mismatches

#### Gettings employees
```json
GET /employees HTTP/1.1
HTTP
[
	{
		"id": 1,
		"givenName": "first",
		"familyName": "middle",
		"team": {
			"id": 9,
			"teamName": "IT"
		},
		"workItems": [],
	},
	{
		"id": 2,
		"givenName": "first",
		"familyName": "middle",
		"team": {
			"id": 11,
			"teamName": "finance"
		},
		"workItems": [{ "id": 20, "title": "some work item"}, { "id": 21, "title": "another work item"}],
	},
	{
		"id": 3,
		"givenName": "first",
		"familyName": "middle",
		"team": "null",
		"workItems": [{ "id": 20, "title": "some work item"}, { "id": 22 , "title": "more work"}]
	}
]
```


#### Gettings nested tasks
```json
GET /employees/1/work-items HTTP/1.1
HTTP
[
    {
        "id": 20,
        "title": "some work item"
    },
    {
        "id": 21,
        "title": "another work item"
    }
]
```

