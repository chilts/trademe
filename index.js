// --------------------------------------------------------------------------------------------------------------------

// core
var qs = require('querystring')

// npm
var request = require('request')

// --------------------------------------------------------------------------------------------------------------------

function Client(opts) {
  if ( opts.env === 'sandbox' ) {
    this.baseUrl = 'https://api.tmsandbox.co.nz/v1/'
  }
  else if ( opts.env === 'production' ) {
    this.baseUrl = 'https://api.trademe.co.nz/v1/'
  }
  else {
    this.baseUrl = opts.baseUrl
  }

  if ( !this.baseUrl ) {
    throw new Error("TradeMe: provide either the 'env' or a 'baseUrl' to use")
  }

  var things = [
    'consumerKey',
    'consumerSecret',
    'oauthToken',
    'oauthTokenSecret',
  ]
  things.forEach(function(thing) {
    if ( !opts[thing] ) {
      throw new Error("TradeMe: you must provide a " + thing)
    }
    // save this to the client object
    this[thing] = opts[thing]
  }.bind(this))
}

// --- Catalogue Methods ---

Client.prototype.SiteStats = function SiteStats(callback) {
  var url = this.baseUrl + 'SiteStats.json'

  var args = {
    url  : url,
    json : true,
  }
  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- My Trade Me Methods ---

Client.prototype.MyTradeMe_Summary = function MyTradeMe_Summary(callback) {
  var url = this.baseUrl + 'MyTradeMe/Summary.json'

  var oauth = {
    consumer_key    : this.consumerKey,
    consumer_secret : this.consumerSecret,
    token           : this.oauthToken,
    token_secret    : this.oauthTokenSecret,
  }

  var args = {
    url   : url,
    oauth : oauth,
    qs    : {
      return_member_profile : true, // true or false
      // return_member_profile : false, // true or false
    },
    json  : true,
  }
  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- Listing Methods ---

// From: http://developer.trademe.co.nz/api-reference/listing-methods/retrieve-hot-listings/
Client.prototype.Listings_Hot = function Listings_Hot(callback) {
  var url = this.baseUrl + 'Listings/Hot.json'

  var oauth = {
    consumer_key    : this.consumerKey,
    consumer_secret : this.consumerSecret,
    token           : this.oauthToken,
    token_secret    : this.oauthTokenSecret,
  }

  // Check some of the incoming args:
  // * buy         :
  // * clearance   :
  // * condition   :
  // * page        :
  // * pay         :
  // * photo_siize :
  // * region      :
  // * rows        :
  // * sort_order  :

  var args = {
    url   : url,
    oauth : oauth,
    qs    : {
      // ToDo: ...?
    },
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = Client

// --------------------------------------------------------------------------------------------------------------------
