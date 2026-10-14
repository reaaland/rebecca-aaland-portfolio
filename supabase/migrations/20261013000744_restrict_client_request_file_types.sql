-- Keep the private client request bucket aligned with the file types accepted by the portal UI.
update storage.buckets
set allowed_mime_types = array[
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/heic',
  'image/heif',
  'application/pdf'
]::text[]
where id = 'client-request-files';
