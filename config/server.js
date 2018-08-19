const path = require('path');
var cmd = require('node-cmd');
const Server = require('node-git-server');

const localRoot = '/gitserver/tmp';

const repos = new Server(path.resolve(__dirname, localRoot), {
    autoCreate: true,

    authenticate: (type, repo, user, next) => {
      if(type == 'push') {
        user((username, password) => {
          if(username == "admin" && password == "empiredidnothingwrong"){
            next();
          } else {
            next("Wrong Creds");
          }
        });
      } else {
        next();
      }
    }

});
const port = process.env.PORT || 4443;

repos.on('push', (push) => {
    console.log(`push ${push.repo}/${push.commit} (${push.branch})`);
    push.accept();
    cmd.run("python /runner.py")
});

repos.listen(port, () => {
    console.log(`node-git-server running at http://localhost:${port}`)
});
