# TradeMe #

## Synopsis ##

```js
var TradeMe = require('trademe')

var client = new TradeMe({
  env              : 'sandbox', // or 'production'
  consumerKey      : process.env.TRADEME_CONSUMER_KEY,
  consumerSecret   : process.env.TRADEME_CONSUMER_SECRET,
  oauthToken       : process.env.TRADEME_OAUTH_TOKEN,
  oauthTokenSecret : process.env.TRADEME_OAUTH_TOKEN_SECRET,
})

client.MyTradeMe_Summary(function(err, data) {
  console.log('MyTradeMe_Summary:', data)
})

client.Listings_Hot(function(err, data) {
  console.log('Listings_Hot:', data)
})
```

## Author ##

Written by: [Andrew Chilton](http://chilts.org/) - [Twitter](https://twitter.com/andychilton).

(Ends)
