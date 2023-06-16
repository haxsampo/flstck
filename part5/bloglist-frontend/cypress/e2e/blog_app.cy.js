describe('Blog', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Latti Muukkainen',
      username: 'lmuukkai',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  it('succeeds with correct credentials', () => {
    cy.get('#username').type("lmuukkai")
    cy.get('#password').type('salasana')
    cy.get('#login_button').click()
    cy.contains('Latti Muukkainen logged in')
  })

  it('fails with wrong credentials', () => {
    cy.get('#username').type("ikkaikkuak")
    cy.get('#password').type('saippuakauppias')
    cy.get('#login_button').click()
    cy.contains('wrong credentials')
  })

})

describe('when logged in', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Latti Muukkainen',
      username: 'lmuukkai',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('#username').type("lmuukkai")
    cy.get('#password').type('salasana')
    cy.get('#login_button').click()
  })

  it('a blog can be created, new blog is listed', () => {
    cy.contains('blogs')
    cy.contains('new blog').click()
    cy.get('#newblog_title').type("tämä_on_testi_titteli")
    cy.get('#newblog_author').type("tämä_on_testi_nimi")
    cy.get('#newblog_url').type("tämä_on_testi_osoite")
    cy.get("#newblog_submit").click()
    cy.contains("tämä_on_testi_titteli")
    cy.contains("show")
  })

  it('a blog shows like button, pressing like button increases likes', () => {
    cy.contains('new blog').click()
    cy.get('#newblog_title').type("tämä_on_testi_titteli")
    cy.get('#newblog_author').type("tämä_on_testi_nimi")
    cy.get('#newblog_url').type("tämä_on_testi_osoite")
    cy.get("#newblog_submit").click()
    cy.contains("show").click()
    cy.contains("0")
    cy.contains("like").click()
    cy.contains("1")
  })

  it('blog adder can delete', () => {
    cy.contains('new blog').click()
    cy.get('#newblog_title').type("tämä_on_testi_titteli")
    cy.get('#newblog_author').type("tämä_on_testi_nimi")
    cy.get('#newblog_url').type("tämä_on_testi_osoite")
    cy.get("#newblog_submit").click()
    cy.contains("show").click()
    cy.contains("delete")
  })

})

describe('when logged in, other', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Latti Muukkainen',
      username: 'lmuukkai',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Lahti Ahmatti',
      username: 'lahmatti',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
    cy.get('#username').type("lmuukkai")
    cy.get('#password').type('salasana')
    cy.get('#login_button').click()
    cy.contains('new blog').click()
    cy.get('#newblog_title').type("tämä_on_testi_titteli")
    cy.get('#newblog_author').type("tämä_on_testi_nimi")
    cy.get('#newblog_url').type("tämä_on_testi_osoite")
    cy.get("#newblog_submit").click()
    cy.get("#logout_button").click()
  })

  it('not adder cant delete', () => {
    cy.get('#username').type("lahmatti")
    cy.get('#password').type('salasana')
    cy.get('#login_button').click()
    cy.contains("show").click()
    cy.contains("delete").should('not.exist')
  })

})