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

Client.prototype.oauth = function oauth() {
  return {
    consumer_key    : this.consumerKey,
    consumer_secret : this.consumerSecret,
    token           : this.oauthToken,
    token_secret    : this.oauthTokenSecret,
  }
}

// --- Catalogue Methods ---

Client.prototype.SiteStats = function SiteStats(callback) {
  var url = this.baseUrl + 'SiteStats.json'

  var args = {
    url  : url,
    body : {},
    json : true,
  }
  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- My Trade Me Methods ---

Client.prototype.MyTradeMe_Summary = function MyTradeMe_Summary(callback) {
  var url = this.baseUrl + 'MyTradeMe/Summary.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : {
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
    oauth : this.oauth(),
    body    : {
      // ToDo: ...?
    },
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- Selling Methods ---

Client.prototype.Selling = function Selling(params, callback) {
  var url = this.baseUrl + 'Selling.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.post(args, function (err, res, data) {
    callback(err, res.body)
  })
}

Client.prototype.ValidateListing = function ValidateListing(params, callback) {
  var url = this.baseUrl + 'Selling/Validate.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.post(args, function (err, res, data) {
    callback(err, res.body)
  })
}

Client.prototype.Withdraw = function Withdraw(params, callback) {
  var url = this.baseUrl + 'Selling/Withdraw.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.post(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- Catalogue Methods ---

Client.prototype.CategoryDetails = function CategoryDetails(params, callback) {
  var url = this.baseUrl + 'Categories/' + params.category + '/Details.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- My Trade Me ---

Client.prototype.MyTradeMe_Summary = function MyTradeMe_Summary(params, callback) {
  var url = this.baseUrl + 'MyTradeMe/Summary.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

Client.prototype.MyTradeMe_SellingItems = function MyTradeMe_SellingItems(params, callback) {
  var url = this.baseUrl + 'MyTradeMe/SellingItems.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

Client.prototype.MyTradeMe_SalesSummary = function MyTradeMe_SalesSummary(params, callback) {
  var url = this.baseUrl + 'MyTradeMe/SalesSummary.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    // body  : params,
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --- Photo Methods ---

Client.prototype.Photos_Add = function Photos_Add(params, callback) {
  var url = this.baseUrl + 'Photos/Add.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.post(args, function (err, res, data) {
    callback(err, res.body)
  })
}

Client.prototype.Photos = function Photos(params, callback) {
  var url = this.baseUrl + 'Photos.json'

  var args = {
    url   : url,
    oauth : this.oauth(),
    body  : params,
    json  : true,
  }

  request.get(args, function (err, res, data) {
    callback(err, res.body)
  })
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = Client

// --------------------------------------------------------------------------------------------------------------------
