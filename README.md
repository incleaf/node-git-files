# node-git-files
Node.js module that returns an array of modified or untracked git files 

## Install

```shell
$ npm install --save node-git-files
```


## Usage

```javascript

import ngf from 'node-git-files'

ngf(['untracked'], (err, res) => console.log(res))
//=> ['newApp.js', 'img/logo.png']

ngf(['modified'], (err, res) => console.log(res)) 
//=> ['index.html', 'app.js']

ngf(['untracked', 'modified'], (err, res) => console.log(res)) 
//=> ['index.html', 'app.js', 'newApp.js', 'img/logo.png']

```

## API

### ngf(types, callback)
Returns an array of git files 

#### types

Type: `Array`

Array of options ('modified', 'untracked')

#### callback(err, res, [errString])

Type: `function`

Callback function

## Lisence
MIT
