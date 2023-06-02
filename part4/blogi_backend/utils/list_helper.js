const dummy = (blogslist) => {
    return 1
}

const totalLikes = (bl) => {
    var tots = bl.reduce(
        function (sum, blog) {
            return sum + blog.likes
        },
        0)
    return tots
}

//4.5

const favoriteBlog = (bl) => {
    var fav = bl.reduce(
        function (favsofar, blag) {
            if (favsofar.likes > blag.likes) {
                return favsofar
            } else {
                return blag
            }

        }
        , bl[0])
    return fav
}

const mostBlogs = (bl) => {
    var authors = {}
    for (let i = 0; i < bl.length; i++) {
        var cur = bl[i]
        if (cur.author in authors) {
            authors[cur.author].blogs = authors[cur.author].blogs + 1
        } else {
            authors[cur.author] = { "author": cur.author, "blogs": 1 }
        }
    }
    var most = authors[Object.keys(authors)[0]]
    for (var av of Object.keys(authors)) {
        if (most.blogs < authors[av].blogs) {
            most = authors[av]
        }
    }
    return most
}


const mostLikes = (bl) => {
    var authors = {}
    for (let i = 0; i < bl.length; i++) {
        var cur = bl[i]
        if (cur.author in authors) {
            authors[cur.author].likes = authors[cur.author].likes + cur.likes
        } else {
            authors[cur.author] = { "author": cur.author, "likes": cur.likes }
        }
    }
    var most = authors[Object.keys(authors)[0]]
    for (var av of Object.keys(authors)) {
        if (most.likes < authors[av].likes) {
            most = authors[av]
        }
    }
    return most
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}