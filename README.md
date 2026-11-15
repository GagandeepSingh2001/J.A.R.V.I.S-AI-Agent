# Changes to make in the worker.py file after creating venv
 ```
 @utils.log_exceptions(logger=logger)
    async def _connection_task(self) -> None:
        # replaced the below assert with an if-check to satisfy mypy
        # assert self._http_session is not None
        if self._http_session is None:
            import aiohttp
            self._http_session = aiohttp.ClientSession()
```
1. Fix the ClientSession initialization
Inside run(), find:
```
self._http_session = aiohttp.ClientSession(proxy=self._http_proxy or None)
```
Replace it with:
```
self._http_session = aiohttp.ClientSession()
```
2. Replace the aclose() method
```
async def aclose(self) -> None:
    async with self._lock:
        if self._closed:
            if self._close_future is not None:
                await self._close_future
            return

        logger.info("shutting down worker", extra={"id": self.id})

        self._closed = True

        # Cancel background tasks if they were started.
        if self._conn_task is not None:
            await utils.aio.cancel_and_wait(self._conn_task)
            self._conn_task = None

        if self._load_task is not None:
            await utils.aio.cancel_and_wait(self._load_task)
            self._load_task = None

        # Close process pool if initialized.
        if hasattr(self, "_proc_pool") and self._proc_pool is not None:
            await self._proc_pool.aclose()

        # Close inference executor if initialized.
        if (
            hasattr(self, "_inference_executor")
            and self._inference_executor is not None
        ):
            await self._inference_executor.aclose()

        # Close HTTP session if initialized.
        if self._http_session is not None and not self._http_session.closed:
            await self._http_session.close()

        # Close HTTP server if initialized.
        if self._http_server is not None:
            await self._http_server.aclose()

        # Close Prometheus server if initialized.
        if (
            hasattr(self, "_prometheus_server")
            and self._prometheus_server is not None
        ):
            await self._prometheus_server.aclose()

        # Close LiveKit API if initialized.
        if hasattr(self, "_api") and self._api is not None:
            await self._api.aclose()

        # Wait for remaining background tasks.
        if hasattr(self, "_tasks") and self._tasks:
            await asyncio.gather(*self._tasks, return_exceptions=True)

        # Close message channel if initialized.
        if hasattr(self, "_msg_chan") and self._msg_chan is not None:
            self._msg_chan.close()

        # Resolve shutdown future if it exists.
        if self._close_future is not None:
            if not self._close_future.done():
                self._close_future.set_result(None)
```

# Commands to run J.A.R.V.I.S:
## Frontend:
```
npm run dev
```
## Backend:
```
venv\Scripts\activate
```
```
python agent.py dev
python agent.py console
```

# Note:
-- Use livekit-agents Version: 1.3.5 with aiohttp Version: 3.10.0

# After making all the adjustments the frontend (UI) should look like this:
<img width="800" align="center" alt="image" src="https://github.com/user-attachments/assets/54913797-5c4c-4159-bffd-3c3095b34c93" />
<img width="800" align="center" alt="image" src="https://github.com/user-attachments/assets/1e5d6750-67b3-4c04-a430-9d7ff377ec15" />



