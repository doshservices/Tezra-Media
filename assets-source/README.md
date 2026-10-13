# Original image sources

Full-resolution originals for the files served from `public/Assets`.

`public/Assets` holds optimised derivatives: resized to 2400px on the long edge,
quality 82, progressive JPEG. That took the served set from 5.8 MB to 0.7 MB.
`contact.jpg` alone was 3.8 MB at 8510x5674 — it is used as a CSS background on
the contact page, so next/image could not resize it automatically.

Keep originals here rather than in `public`, so nothing in this folder is served
to visitors but the full-resolution source is never lost. To regenerate the
derivatives after adding a file here, resize it to 2400px wide at quality 82 and
write it to `public/Assets` under the same name.
