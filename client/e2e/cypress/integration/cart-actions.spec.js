/// <reference types="Cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it.only('Add items to cart', () => {
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=view-cart-btn]').click();
    cy.contains('2 Selected item')

  })

  it.only('Purchase the item in the cart', () => {
    cy.get('[data-cy=add-to-cart-1]').click();
    cy.get('[data-cy=add-to-cart-4]').click();

    cy.get('[data-cy=view-cart-btn]').click();

    cy.get('[data-cy=purchase-cart-btn]').click();
    cy.contains('Purchase Success!')

  })

  it.only('View the recent purchased items', () => {
    cy.get('[data-cy=add-to-cart-5]').click();
    cy.get('[data-cy=add-to-cart-6]').click();

    cy.get('[data-cy=view-cart-btn]').click();

    cy.get('[data-cy=purchase-cart-btn]').click();
  

    cy.get('[data-cy=recent-purchase-btn]').click();
    cy.get('[data-cy=recent-purchase-list]').contains('JARLSBERG')
    cy.get('[data-cy=recent-purchase-list]').contains('MAASDAM ')

  



  })

})