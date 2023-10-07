const handleUnspecifiedRouteRequests = (req, res) => {
  const html404Page = 'Not Found html page';
  res.status(404);
  if (req.accepts('html')) {
    return res.send(html404Page);
  }
  if (req.accepts('json')) {
    return res.json({
      error: {
        code: 'not_found',
        message: '404 Not found',
      },
    });
  }
  res.type('txt').send('404 Not found');
};

export default handleUnspecifiedRouteRequests;
