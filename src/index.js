const quoteList = document.querySelector('#quote-list')
const formEl = document.querySelector('#new-quote-form')
const quoteInputEl = document.querySelector('#new-quote')
const authorInputEl = document.querySelector('#author')
const sortByAuthorBtn = document.querySelector('#sort-by-author')

let authorSortStatus = false
    

const renderQuotes = (quotes) => {
    quoteList.innerHTML = ''
    quotes.forEach(renderQuote)
}

const renderQuote = (quote) => {
    const quoteItem = document.createElement('li')
    quoteItem.classList.add("quote-card")
    quoteItem.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
            <button class='btn-danger'>Delete</button>
            <button id="edit-btn" class='btn btn-link'>Edit</button
        </blockquote>
    `
    const editForm = document.createElement('form')
    editForm.id = 'edit-form'
    editForm.style.display = 'none'
    editForm.innerHTML = `
            <label for="edit-author">Edit Author</label>
            <input type="text" class="form-control" id="edit-author" value="${quote.author}">
            <label for="edit-quote">Edit Quote</label>
            <input type="text" class="form-control" id="edit-quote" value="${quote.quote}">
            <button type="submit" class="btn btn-link">Submit</button>`

    editForm.addEventListener('submit', event => {
        event.preventDefault()
        const editAuthor = editForm.querySelector('#edit-author')
        const editQuote = editForm.querySelector('#edit-quote')

        const newEditQuote = {
            author: editAuthor.value,
            quote: editQuote.value,
            likes: quote.likes,
            id: quote.id
        }
        patchQuote(newEditQuote)
            .then(() => fetchQuotes()
                .then(renderQuotes))
    })
    
    quoteItem.appendChild(editForm)


    const editBtn = quoteItem.querySelector('#edit-btn')
    editBtn.addEventListener('click', () => {        
        if (editForm.style.display === 'block') {
            editForm.style.display = 'none'
        } else {
            editForm.style.display = 'block'
        }

    })

    const deleteBtn = quoteItem.querySelector('.btn-danger')
    deleteBtn.addEventListener('click', () => deleteQuote(quote).then(() => quoteItem.remove()))

    const likeBtn = quoteItem.querySelector('.btn-success')
    likeBtn.addEventListener('click', () => {
        ++quote.likes
        patchQuote(quote)
            .then(() => fetchQuotes()
                .then(renderQuotes))
    })

    quoteList.appendChild(quoteItem)
}

formEl.addEventListener('submit', event => {
    event.preventDefault()

    newQuote = {
        quote: quoteInputEl.value,
        author: authorInputEl.value,
        likes: 0
    }

    postQuote(newQuote)
        .then(renderQuote)

})

sortByAuthorBtn.addEventListener('click', () => sortByAuthor())

const sortByAuthor = () => {
    sortByAuthorBtn.innerText = authorSortStatus ? 'Sort by author' : 'Clear sort'
    authorSortStatus = !authorSortStatus
    if (authorSortStatus) {
        fetchQuotes()
            .then(resp => resp.sort(function (a, b) {
                if (a.author < b.author) { return -1 }
                if (a.author > b.author) { return 1 }
                return 0
            })).then(renderQuotes)
    }
    if (!authorSortStatus) {
        return fetchQuotes()
            .then(renderQuotes)
    }

}

fetchQuotes()
    .then(renderQuotes)
