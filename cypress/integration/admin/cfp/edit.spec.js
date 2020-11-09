describe('The CFP edit screen', () => {
  beforeEach(() => {
    cy.visit('/admin/cfp/encuentros-codear');
  });

  it('should allow to add a field', () => {
    // act
    cy
      .contains('button', 'Título')
      .click();

    // assert
    cy
      .contains('h2', 'Nuevo Campo')
      .should('exist');
  });

  it('should allow to delete a field', () => {
    // act
    cy
      .contains('h2', 'Nuevo Campo')
      .click();
    cy
      .contains('button', 'Eliminar')
      .click();

    // assert
    cy
      .contains('h2', 'Nuevo Campo')
      .should('not.exist');
  });
});
