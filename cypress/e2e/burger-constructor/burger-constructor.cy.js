describe('add all ingredients', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.intercept('GET', '/api/ingredients', {
            fixture: 'ingredients.json'
        })

        cy.get('[class^=burger-ingredients_content]').should('exist').as('ingredients')
        cy.get('[class^=burger-constructor_container]').should('exist').as('constructor')

        cy.get('@ingredients').find('#bun + [class^=burger-ingredients_list-wrap] li:first-child').should('exist').as('bunItem')
        cy.get('@ingredients').find('#sauce + [class^=burger-ingredients_list-wrap] li:first-child').should('exist').as('sauceItem')
        cy.get('@ingredients').find('#main + [class^=burger-ingredients_list-wrap] li:first-child').should('exist').as('mainItem')

        cy.get('[class^=burger-constructor_total] > .button').should('exist').as('buttonSubmitOrder').should('exist').and('be.disabled')
    })

    it('authorization', () => {
        cy.visit('/login')
        cy.location('pathname').should('eq', '/login')
        cy.get('[name=email]').type('ant.grakhov@gmail.com')
        cy.get('[name=password]').type('12345678')
        cy.get('[type=submit]').click()
    })

    it('show ingredient details modal', () => {
        cy.get('@bunItem').click()
        cy.get('[class^=modal_container]').should('exist').as('ingredientModal')
        cy.get('[class^=ingredient-details_container]').should('exist')
        cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c')
        cy.get('body').type('{esc}')
        cy.location('pathname').should('eq', '/')
    })

    it('add ingredients to cart', () => {
        cy.get('@bunItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@bunItem').get('.counter__num').should('exist').and('have.text', '2')

        cy.get('@sauceItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauceItem').find('.counter__num').should('exist').and('have.text', '1')

        cy.get('@mainItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@mainItem').find('.counter__num').should('exist').and('have.text', '1')

        cy.get('@constructor').find('[class^=burger-constructor_price]').should('exist').and('have.text', '3024')
        cy.get('@buttonSubmitOrder').should('not.be.disabled')
    })

    it('remove ingredient from cart', () => {
        cy.get('@sauceItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauceItem').find('.counter__num').should('exist')
        cy.get('@constructor').find('[class^=burger-constructor-inside-item_item] .constructor-element__action').click()
        cy.get('@buttonSubmitOrder').should('be.disabled')
    })

    it('submit order', () => {
        cy.intercept('POST', '/api/orders', {
            fixture: 'orders.json'
        })
        cy.intercept('POST', '/api/auth/login', {
            fixture: 'login.json'
        })
        cy.intercept('GET', '/api/auth/user', {
            fixture: 'user.json'
        })

        cy.get('@bunItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')

        cy.get('@sauceItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')

        cy.get('@mainItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')

        cy.get('@buttonSubmitOrder').click()

        cy.location('pathname').should('eq', '/login')
        cy.get('[name=email]').type('ant.grakhov@gmail.com')
        cy.get('[name=password]').type('12345678')
        cy.get('[type=submit]').click()

        cy.get('[class^=burger-constructor_total] > .button').click()

        cy.get('[class^=modal_container]').should('exist').as('orderModal')
        cy.get('@orderModal').find('.digits-with-shadow').should('have.text', '1234')
        cy.get('body').type('{esc}')
        cy.get('@orderModal').should('not.exist')
    })
})