const baseURL = import.meta.env.VITE_API_ENDPOINT
type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestParams = {
  method: HttpMethodType,
  body?: Record<string, any>,
  route: string
}
export const http = async <ResponseType>({body,method , route} : RequestParams) => {
  
  const response = await fetch(baseURL +'/' + route, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    method
  })

  if (!response.ok) {
    const errMsg = (response as any).message
    throw new Error(errMsg)
  }

  const payload : {
    message?: string,
    data: ResponseType
  }  = await response.json()

  return payload
}
