# Executor

This server accepts program code of a designated language and returns the output of the code execution, whether it needs to be parsed into an intermediary language or not.

The grammar parsing uses PEGjs and the code execution uses glot.io

### Endpoints

| Request | Endpoint |
| ------ | ------ |
| POST | /api/{language} |
| POST | /api/primitive |