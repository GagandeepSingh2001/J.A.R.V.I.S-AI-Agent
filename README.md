## Changes to make in the worker.py file in venv
 ```
 @utils.log_exceptions(logger=logger)
    async def _connection_task(self) -> None:
        # replaced the below assert with an if-check to satisfy mypy
        # assert self._http_session is not None
        if self._http_session is None:
            import aiohttp
            self._http_session = aiohttp.ClientSession()
```

## Commands to run J.A.R.V.I.S:
# Frontend:
```
npm run dev
```
# Backend:
```
venv\Scripts\activate
```
```
python agent.py dev
python agent.py console
```

## Note:
-- Use livekit-agents Version: 1.3.5 with aiohttp Version: 3.10.0
