describe('add all ingredients', () => {
    const FIRST_TAB_INGREDIENT_SELECTOR = '[class^=burger-ingredients_list-wrap] li:first-child'
    const BUTTON_SUBMIT_ORDER_SELECTOR = '[class^=burger-constructor_total] > .button'
    const MODAL_CONTAINER_SELECTOR = '[class^=modal_container]'
    const COUNTER_NUM_SELECTOR = '.counter__num'
    const EMAIL_INPUT_SELECTOR = '[name=email]'
    const PASSWORD_INPUT_SELECTOR = '[name=password]'
    const LOGIN_SUBMIT_SELECTOR = '[type=submit]'

    const ROOT_PATHNAME = '#/'
    const LOGIN_PATHNAME = '#/login'

    const EMAIL = 'ant.grakhov@gmail.com'
    const PASSWORD = '123456'

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('GET', '/api/ingredients', {
            fixture: 'ingredients.json'
        })

        cy.get('[class^=burger-ingredients_content]').should('exist').as('ingredients')
        cy.get('[class^=burger-constructor_container]').should('exist').as('constructor')

        cy.get('@ingredients').find(`#bun + ${FIRST_TAB_INGREDIENT_SELECTOR}`).should('exist').as('bunItem')
        cy.get('@ingredients').find(`#sauce + ${FIRST_TAB_INGREDIENT_SELECTOR}`).should('exist').as('sauceItem')
        cy.get('@ingredients').find(`#main + ${FIRST_TAB_INGREDIENT_SELECTOR}`).should('exist').as('mainItem')

        cy.get(BUTTON_SUBMIT_ORDER_SELECTOR).should('exist').as('buttonSubmitOrder').should('exist').and('be.disabled')
    })

    it('authorization', () => {
        cy.visit(LOGIN_PATHNAME)
        cy.hash().should('eq', LOGIN_PATHNAME)
        cy.get(EMAIL_INPUT_SELECTOR).type(EMAIL)
        cy.get(PASSWORD_INPUT_SELECTOR).type(PASSWORD)
        cy.get(LOGIN_SUBMIT_SELECTOR).click()
    })

    it('show ingredient details modal', () => {
        cy.get('@bunItem').click()
        cy.get(MODAL_CONTAINER_SELECTOR).should('exist').as('ingredientModal')
        cy.get('[class^=ingredient-details_container]').should('exist')
        cy.hash().should('eq', '#/ingredients/643d69a5c3f7b9001cfa093c')
        cy.get('body').type('{esc}')
        cy.hash().should('eq', ROOT_PATHNAME)
    })

    it('add ingredients to cart', () => {
        cy.get('@bunItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@bunItem').get(COUNTER_NUM_SELECTOR).should('exist').and('have.text', '2')

        cy.get('@sauceItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauceItem').find(COUNTER_NUM_SELECTOR).should('exist').and('have.text', '1')

        cy.get('@mainItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@mainItem').find(COUNTER_NUM_SELECTOR).should('exist').and('have.text', '1')

        cy.get('@constructor').find('[class^=burger-constructor_price]').should('exist').and('have.text', '3024')
        cy.get('@buttonSubmitOrder').should('not.be.disabled')
    })

    it('remove ingredient from cart', () => {
        cy.get('@sauceItem').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauceItem').find(COUNTER_NUM_SELECTOR).should('exist')
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

        cy.hash().should('eq', LOGIN_PATHNAME)
        cy.get(EMAIL_INPUT_SELECTOR).type(EMAIL)
        cy.get(PASSWORD_INPUT_SELECTOR).type(PASSWORD)
        cy.get(LOGIN_SUBMIT_SELECTOR).click()

        cy.get(BUTTON_SUBMIT_ORDER_SELECTOR).as('buttonSubmitOrder').click()
        cy.get(MODAL_CONTAINER_SELECTOR).should('exist').as('orderModal')
        cy.get('@orderModal').find('.digits-with-shadow').should('have.text', '1234')
        cy.get('body').type('{esc}')
        cy.get('@orderModal').should('not.exist')
        cy.get('@buttonSubmitOrder').should('be.disabled')
    })
})