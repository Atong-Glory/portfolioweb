export type LimitedJsonResult =
  | { success: true; value: unknown }
  | { success: false; status: 400 | 413 | 415; message: string }

export async function readLimitedJsonBody(
  request: Request,
  maxBytes: number
): Promise<LimitedJsonResult> {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  if (contentType !== 'application/json') {
    return { success: false, status: 415, message: 'Content-Type must be application/json.' }
  }

  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { success: false, status: 413, message: 'Request body is too large.' }
  }

  if (!request.body) {
    return { success: false, status: 400, message: 'Request body is required.' }
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    totalBytes += value.byteLength
    if (totalBytes > maxBytes) {
      await reader.cancel()
      return { success: false, status: 413, message: 'Request body is too large.' }
    }
    chunks.push(value)
  }

  const bytes = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  let value: unknown
  try {
    value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes))
  } catch {
    return { success: false, status: 400, message: 'Request body must contain valid JSON.' }
  }

  return { success: true, value }
}
