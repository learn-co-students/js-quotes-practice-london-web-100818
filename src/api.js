const quotesUrl = 'http://localhost:3000/quotes'

const getQuotes = () =>
  fetch(quotesUrl)
    .then(resp => resp.json())

const createQuote = quoteToCreate =>
  fetch(quotesUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(quoteToCreate)
  })
    .then(resp => resp.json())

const updateQuote = (quoteToUpdate, attrToUpdate) =>
  fetch(quotesUrl + '/' + quoteToUpdate.id, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(attrToUpdate)
  })
    .then(resp => resp.json())

const deleteQuote = quoteToDelete =>
  fetch(quotesUrl + '/' + quoteToDelete.id, {method: 'DELETE'})