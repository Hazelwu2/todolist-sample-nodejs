export const handleChunk = async (req) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  return JSON.parse(Buffer.concat(buffers).toString())
}