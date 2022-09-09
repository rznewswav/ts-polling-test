﻿import { got } from 'got';
const [, , _url] = process.argv;
const url = _url ?? process.env.POLL_URL;
if (!url)
    throw new Error('Poll url is not set! Use POLL_URL environment or pass in the argument parameter.');
let lastElaspedTime = Date.now();
function getAndUpdateElaspedTime() {
    const now = Date.now();
    const elasped = now - lastElaspedTime;
    lastElaspedTime = now;
    return { elasped };
}
function log(message) {
    console.log({
        level: 'info',
        ...message,
        ...getAndUpdateElaspedTime(),
    });
}
function error(message) {
    console.error({
        level: 'error',
        ...message,
        ...getAndUpdateElaspedTime(),
    });
}
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
let data;
while (true) {
    const nextPolling = ~~(50000 + Math.random() * 20000);
    try {
        const data = await got.get(new URL(url));
        const isOk = data.statusCode >= 200 && data.statusCode < 300;
        if (isOk) {
            log({
                msg: `Polling OK!`,
                metadata: {
                    url,
                    statusCode: data.statusCode,
                    nextPolling,
                },
            });
        }
        else {
            error({
                msg: `Polling Error!`,
                metadata: {
                    url,
                    statusCode: data.statusCode,
                    nextPolling,
                },
            });
        }
    }
    catch (err) {
        error({
            msg: `Server Error!`,
            metadata: {
                url,
                statusCode: data.statusCode,
                nextPolling,
            },
        });
    }
    await sleep(nextPolling);
}
