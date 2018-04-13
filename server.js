const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const { Client } = require('pg');
const cors = require('cors');
const requestIp = require('request-ip');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/subjects', (request, response) => {
  client.query('SELECT name FROM subject ORDER BY name', (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

app.get('/api/subjects/:name', (request, response) => {
  var title = String(request.params.name);
  client.query(`SELECT subject.name, article.title, article.link FROM articlesubject INNER JOIN subject ON articlesubject.subject_id = subject.subject_id INNER JOIN article ON articlesubject.article_id = article.article_id WHERE UPPER(subject.name) = UPPER('${title}')`, (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

app.get('/api/subject/:title', (request, response) => {
  var title = String(request.params.title).toUpperCase();
  client.query(`SELECT subject.name, article.title, article.link FROM articlesubject INNER JOIN subject ON articlesubject.subject_id = subject.subject_id INNER JOIN article ON articlesubject.article_id = article.article_id WHERE UPPER(article.title) LIKE '${title}%' OR UPPER(article.title) LIKE '% ${title}%'`, (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

app.post('/api/clap', (request, response) => {
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  client.query(`INSERT INTO clap(ip) VALUES('${ip}')`, (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

app.post('/api/write', (request, response) => {
  client.query(`INSERT INTO written(subject, title) VALUES('${request.body.subject}', '${request.body.title}')`, (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

app.get('/api/count_claps', (request, response) => {
  client.query(`SELECT count(*) AS exact_count FROM clap`, (err, table) => {
    if(err) {
      throw err;
    }
    return response.status(200).send(table.rows);
    client.end();
  });
});

if(process.env.NODE_ENV === 'production') {

  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('listening on PORT ' + PORT));
