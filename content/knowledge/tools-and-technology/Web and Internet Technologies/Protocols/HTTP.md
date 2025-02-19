#programmation/web

HTTP (Hypertext Transfer Protocol) is a protocol used to transmit data over the internet. It is a standard communication protocol used between clients (such as web browsers) and servers (such as web servers) to exchange information such as text, images, videos, and other multimedia content.

HTTP is a stateless protocol, which means that each request and response are independent of each other and do not maintain any record of previous interactions. The current version of HTTP is HTTP/2, which was released in 2015 and provides improvements in speed, security, and efficiency over previous versions.

HTTP operates on top of the TCP/IP protocol, which provides reliable transmission of data packets over the internet. When a client sends an HTTP request to a server, the server responds with an HTTP response, which includes the requested content or an error message if the request is unsuccessful. The HTTP protocol also defines a set of methods (such as GET, POST, PUT, and DELETE) that can be used to request and modify resources on the server.

## HTTP Verbs
HTTP defines a set of methods, also known as HTTP verbs, which are used to indicate the desired action to be performed on a resource on the server. The most commonly used HTTP methods are:

1.  GET: retrieves the information or data specified by the URL from the server. This is the most commonly used HTTP method for retrieving web pages, images, videos, and other types of content from web servers.
2.  POST: submits data to be processed by the server, usually used to submit data through a form or to create a new resource on the server.
3.  PUT: updates an existing resource on the server, usually used to update or modify an existing resource.
4.  DELETE: deletes a resource on the server.
5.  HEAD: retrieves only the header information of a resource, without the actual content.
6.  OPTIONS: returns a list of the HTTP methods supported by the server for a particular resource.
7.  CONNECT: establishes a network connection to a resource, usually used for setting up a secure connection.
8.  TRACE: echoes back the received request message to the client, used for testing or debugging purposes.

These HTTP methods are essential for building web applications and services, and they enable developers to perform a wide range of operations on web resources.

## HTTP status
returned by servers to indicate the status of a client's request. There are five classes of HTTP status codes, each indicating a different type of status. The most commonly used HTTP status codes include:

1.  1xx Informational: This class of status codes indicates that the server has received the request and is processing it. Examples include 100 Continue, which indicates that the server has received the request headers and is waiting for the client to send the request body.
2.  2xx Success: This class of status codes indicates that the request was successful. The most commonly used status code in this class is 200 OK, which indicates that the request was successful and the server has returned the requested data.
3.  3xx Redirection: This class of status codes indicates that the client must take additional steps to complete the request. Examples include 301 Moved Permanently, which indicates that the requested resource has been permanently moved to a new URL.
4.  4xx Client Error: This class of status codes indicates that the client has made an error in the request. Examples include 404 Not Found, which indicates that the requested resource could not be found on the server.
5.  5xx Server Error: This class of status codes indicates that the server encountered an error while processing the request. Examples include 500 Internal Server Error, which indicates that there was an error on the server while processing the request.

HTTP status codes are essential for understanding the status of a client's request and for troubleshooting errors that occur during the communication between the client and server.
