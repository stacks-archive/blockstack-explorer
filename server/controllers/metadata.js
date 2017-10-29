var fetch = require('isomorphic-fetch');

const metadataRoutes = function(express) {

  const routes = express.Router();
  const coreApi = 'https://core.blockstack.org'

  routes.get('/name/:name', (req, res) => {
    const name = req.params.name;
    return fetch(`${coreApi}/v2/users/${name}`)
      .then(function(response){
        if (response.status !== 200) {
          return Promise.reject({ message: 'Could not resolve profile' });
        }
        return response.json()
      })
      .then(function(data){
        const profile = data[name].profile
        const fullName = profile.name
        const description = profile.description
        const ogTitle = (fullName && fullName.length > 0) 
          ? `${fullName}'s Blockstack ID - ${name}`
          : `${name}`

        var ogDescription = ''

        if(fullName && fullName.length > 0){
          ogDescription += `${fullName} (${name}) has registered an identity on Blockstack, a new internet for decentralized apps.`;
        } else {
          ogDescription += `${name} is a registered identity on Blockstack, a new internet for decentalized apps`;
        }

        if(description && description.length > 0){
          ogDescription += ` ${description}`
        }

        var photo = 'http://' + req.header('host') + '/img/og-square.png'

        if(profile.image && profile.image.length > 0){
          photo = profile.image[0].contentUrl
        }

        const ogUrl = `http://${req.header('host')}/name/${name}`

        res.header('Content-Type', 'text/html')
        .send(`
          <html>
          <head>
            <title>${ogTitle}</title>
            <meta property="og:title" content="${ogTitle}" />
            <meta property="og:description" content="${ogDescription}" />
            <meta property="og:image" content="${photo}" />
            <meta property="og:url" content="${ogUrl}" />
            <meta property="og:type" content="profile" />
            <meta name='twitter:card' content='summary' />
            <meta name="twitter:title" content="${ogTitle}" />
            <meta name="twitter:description" content="${ogDescription}" />
            <meta name="twitter:image" content="${photo}" />
          </head>
          <body>
          ${fullName}
          ${description}
          ${photo}
          </body>
          </html>`)
        return;
      })
      .catch(function(err){
        res.send(`Error: ${err.message}`)
      });
  })

  routes.get('/address/:address', (req, res) => {
    const address = req.params.address;

    return fetch(`${coreApi}/v1/addresses/bitcoin/${address}`)
      .then(function(response){
        if (response.status !== 200) {
          return Promise.reject({ message: 'Could not resolve profile' });
        }

        return response.json()
      })
      .then(function(data){
      	const names = data.names;

      	if(names === undefined || names.length === 0){
      		return Promise.reject({ message: 'Address does not own any names' });
      	}

      	const name = data.names[0]

      	return fetch(`${coreApi}/v2/users/${name}`)
      })
      .then(function(response){
      	return response.json()
      })
      .then(function(data){
        const name = Object.keys(data)[0]
        const profile = data[name].profile
        const fullName = profile.name
        const description = profile.description
        const ogTitle = (fullName && fullName.length > 0) 
          ? `${fullName}'s Blockstack ID - ${name}`
          : `${name}`

        var ogDescription = ''

        if(fullName && fullName.length > 0){
          ogDescription += `${fullName} (${name}) has registered an identity on Blockstack, a new internet for decentralized apps.`;
        } else {
          ogDescription += `${name} is a registered identity on Blockstack, a new internet for decentalized apps`;
        }

        if(description && description.length > 0){
          ogDescription += ` ${description}`
        }

        var photo = 'http://' + req.header('host') + '/img/og-square.png'

        if(profile.image && profile.image.length > 0){
        	photo = profile.image[0].contentUrl
        }

        const ogUrl = `http://${req.header('host')}/address/${address}`
        
        res.header('Content-Type', 'text/html')
        .send(`
          <html>
          <head>
            <title>${ogTitle}</title>
            <meta property="og:title" content="${ogTitle}" />
            <meta property="og:description" content="${ogDescription}" />
            <meta property="og:image" content="${photo}" />
            <meta property="og:url" content="${ogUrl}" />
            <meta property="og:type" content="profile" />
            <meta name='twitter:card' content='summary' />
            <meta name="twitter:title" content="${ogTitle}" />
            <meta name="twitter:description" content="${ogDescription}" />
            <meta name="twitter:image" content="${photo}" />
          </head>
          <body>
          ${fullName}
          ${description}
          ${photo}
          </body>
          </html>`)
        return;
      })
      .catch(function(err){
      	res.send(`Error: ${err.message}`)
      });

  });

  return routes
}

module.exports = metadataRoutes;