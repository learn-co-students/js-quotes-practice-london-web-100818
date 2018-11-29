const fetchQuotes = () => 
    fetch('http://localhost:3000/quotes')
        .then(resp => resp.json())

const postQuote = (newQuote) =>
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newQuote)
    }).then(resp => resp.json())

const patchQuote = (editedQuote) => 
    fetch(`http://localhost:3000/quotes/${editedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedQuote)
    }).then(resp => resp.json())

const deleteQuote = (quote) => 
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())