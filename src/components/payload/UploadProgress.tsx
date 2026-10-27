"use client";

import React from "react";

/**
 * Upload progress for the Media collection. Registered as edit.beforeDocumentControls.
 *
 * Payload's admin saves through fetch(), and the Fetch API reports no progress for the request
 * body, so a large video uploads with no feedback at all. This swaps that one request for an
 * XMLHttpRequest, which does report bytes sent, and leaves every other request alone.
 */

const isFileBody = (body: BodyInit | null | undefined): body is FormData => {
  if (typeof FormData === "undefined" || !(body instanceof FormData)) return false;
  for (const value of body.values()) {
    if (value instanceof File && value.size > 0) return true;
  }
  return false;
};

/** Re-issues one request over XHR so the bytes sent can be counted. */
const sendWithProgress = (
  url: string,
  init: RequestInit,
  body: FormData,
  onProgress: (loaded: number, total: number) => void,
): Promise<Response> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open((init.method ?? "POST").toUpperCase(), url, true);
    xhr.withCredentials = init.credentials !== "omit";
    xhr.responseType = "blob";

    new Headers(init.headers ?? {}).forEach((value, key) => {
      // Set by the browser from the FormData, and overriding it loses the multipart boundary.
      if (key.toLowerCase() !== "content-type") xhr.setRequestHeader(key, value);
    });

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded, event.total);
    });

    xhr.addEventListener("load", () => {
      resolve(
        new Response(xhr.response as Blob, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: new Headers(
            Object.fromEntries(
              xhr
                .getAllResponseHeaders()
                .trim()
                .split(/[\r\n]+/)
                .filter(Boolean)
                .map((line) => {
                  const [name, ...rest] = line.split(": ");
                  return [name, rest.join(": ")];
                }),
            ),
          ),
        }),
      );
    });

    xhr.addEventListener("error", () => reject(new TypeError("Network request failed")));
    xhr.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));

    const signal = init.signal;
    if (signal) {
      if (signal.aborted) {
        xhr.abort();
        return;
      }
      signal.addEventListener("abort", () => xhr.abort(), { once: true });
    }

    xhr.send(body);
  });

export function UploadProgress() {
  const [sent, setSent] = React.useState<number | null>(null);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const original = window.fetch;

    window.fetch = async (input, init) => {
      const body = init?.body;
      if (!init || !isFileBody(body)) return original(input, init);

      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

      setSent(0);
      setTotal(0);
      try {
        return await sendWithProgress(url, init, body, (loaded, bytes) => {
          setSent(loaded);
          setTotal(bytes);
        });
      } catch (error) {
        // An AbortError is the user's own doing; anything else may be this shim, so let the
        // original fetch have a go rather than failing a save over a progress bar.
        if (error instanceof DOMException && error.name === "AbortError") throw error;
        return original(input, init);
      } finally {
        setSent(null);
      }
    };

    return () => {
      window.fetch = original;
    };
  }, []);

  if (sent === null) return null;

  const percent = total > 0 ? Math.round((sent / total) * 100) : 0;
  const mb = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="tz-upload-progress" role="status" aria-live="polite">
      <div className="tz-upload-progress__row">
        <span>{percent === 100 ? "Processing on the server…" : "Uploading"}</span>
        <span className="tz-upload-progress__count">
          {total > 0 ? `${mb(sent)} of ${mb(total)} MB · ${percent}%` : "starting…"}
        </span>
      </div>
      <div className="tz-upload-progress__track">
        <div
          className="tz-upload-progress__bar"
          style={{ width: `${percent}%` }}
          data-indeterminate={percent === 100 ? "true" : undefined}
        />
      </div>
    </div>
  );
}
