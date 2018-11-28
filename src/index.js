// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const quoteList = document.querySelector("#quote-list")
const quoteForm = document.querySelector("#new-quote-form")



const addQuote = (quote) => {

const quoteListEl = document.createElement('li')   
quoteListEl.className = 'quote-card' 

 quoteListEl.innerHTML = `
 <blockquote class="blockquote">
 <p class="mb-0">${quote.quote}</p>
 <footer class="blockquote-footer">${quote.author}</footer>
 <button class='btn-success' id="add-like-${quote.id}">Likes: <span class="likes" id="like-${quote.id}">${quote.likes}</span></button>
 <button class='btn-danger' id="quote-${quote.id}">Delete</button>
    </blockquote>
 `
 quoteList.appendChild(quoteListEl)

 const likeBtn = document.querySelector(`#add-like-${quote.id}`)
 const likesEl = document.querySelector(`#like-${quote.id}`)
 const deleteBtn = document.querySelector(`#quote-${quote.id}`)
9

likeBtn.addEventListener("click", () => {
    quote.likes++
    likesEl.innerText = `${quote.likes}`
    updateQuote(quote)
})

deleteBtn.addEventListener("click", () => {
    deleteQuote(quote.id)
    quoteListEl.remove()
    
})}



const getQuotes = () => fetch('http://localhost:3000/quotes').then(res => res.json())

const addQuotes = (quotes) => quotes.forEach(quote => addQuote(quote))
   


    const createQuote = quote => 
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
        }).then(resp => resp.json())
    
    

    const updateQuote = quote => 
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(quote)
     }).then(resp => resp.json())


     const deleteQuote = id => {
     fetch(`http://localhost:3000/quotes/${id}`, {
       method: 'DELETE'
        }).then(resp => resp.json())
    }

    document.addEventListener('DOMContentLoaded', () => {
        
    getQuotes().then(res => addQuotes(res))

    })

    quoteForm.addEventListener("submit", () => {
        event.preventDefault()

        const quote = {
            author: author.value,
            quote: newquote.value,
            likes:0
        }
        createQuote(quote)
        .then(serverQuote => addQuote(serverQuote))

     } )

