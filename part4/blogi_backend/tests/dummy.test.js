const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const listWithMultipleBlogs = [
    {
        _id: '5asdasdd17f8',
        title: 'Mutsis',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Vihasdaasdasdajat',
        url: 'www.aisuyd978h.com.fi',
        likes: 9,
        __v: 0
    }
]

const otherListWithMultipleBlogs = [
    {
        _id: '5asdasdd17f8',
        title: 'Mutsis',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 212,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Vihasdaasdasdajat',
        url: 'www.aisuyd978h.com.fi',
        likes: 9,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 211,
        __v: 0
    },
]

const listWithNoLikes = [
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Mutsis',
        url: 'www.aisuyd978h.com.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5asdasdd17f8',
        title: 'Mutsis',
        author: 'Mutsis',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Mutsis',
        url: 'www.hs.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Mutsis',
        url: 'www.aisuyd978h.com.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Mutsis',
        url: 'www.aisuyd978h.com.fi',
        likes: 0,
        __v: 0
    }
]

const listForMostLikes = [
    {
        _id: '5asdasdd17f8',
        title: 'Mutsis',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 100,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 0,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Vihasdaasdasdajat',
        url: 'www.aisuyd978h.com.fi',
        likes: 9,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 299,
        __v: 0
    },
    {
        _id: '5asdasdd17f8',
        title: 'Sun mutsis',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 100,
        __v: 0
    },
    {
        _id: '5asdasdd17f8',
        title: 'Arvaa kenestä kirjotan',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 100,
        __v: 0
    }
]

const twoEqualsList = [
    {
        _id: '5asdasdd17f8',
        title: 'Mutsis',
        author: 'Edsger W. Dijkstra',
        url: 'oaisjdoiasjdmaldkmsad.com',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa76664214124124',
        title: 'Everything Considered Harmful',
        author: 'Vihaajat',
        url: 'www.hs.fi',
        likes: 9,
        __v: 0
    },
    {
        _id: '5645898431684asd4124124',
        title: 'AEAEAEAE',
        author: 'Vihasdaasdasdajat',
        url: 'www.aisuyd978h.com.fi',
        likes: 9,
        __v: 0
    }
]

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 313,
            __v: 0
        }
    ]

    test('one blog', () => {
        const res = listHelper.totalLikes(listWithOneBlog)
        expect(res).toBe(313)
    })

    test('multiple blags', () => {
        const res = listHelper.totalLikes(listWithMultipleBlogs)
        expect(res).toBe(14)
    })

    test('multiple blags, no likes', () => {
        const res = listHelper.totalLikes(listWithNoLikes)
        expect(res).toBe(0)
    })

})

describe('favourite blag', () => {

    test('multiple blags, correct return is last', () => {
        const res = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(res).toEqual(listWithMultipleBlogs[2])
    })

    test('multiple blags, no likes, returns atleast one', () => {
        const res = listHelper.favoriteBlog(listWithNoLikes)
        expect(res.author).toEqual("Mutsis")
    })

    test('multiple blags, correct is first', () => {
        const res = listHelper.favoriteBlog(otherListWithMultipleBlogs)
        expect(res).toEqual(otherListWithMultipleBlogs[0])
    })

})

describe('Most blogs per author', () => {

    test('multiple blags', () => {
        const res = listHelper.mostBlogs(listWithNoLikes)
        expect(res).toEqual({ "author": "Mutsis", "blogs": 5 })
    })

    test('multiple blags, correct amount is one', () => {
        const res = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(res.blogs).toEqual(1)
    })
})


describe('Most likes per author', () => {

    test('multiple blags, no likes', () => {
        const res = listHelper.mostLikes(listWithNoLikes)
        expect(res.likes).toEqual(0)
    })

    test('multiple blags, correct amount is one', () => {
        const res = listHelper.mostLikes(listForMostLikes)
        expect(res).toEqual({ "author": 'Edsger W. Dijkstra', likes: 300 })
    })

    test('multiple blags, two equals', () => {
        const res = listHelper.mostLikes(twoEqualsList)
        expect(res.likes).toEqual(9)
    })
})