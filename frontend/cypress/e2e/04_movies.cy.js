describe("Page des films", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/movies");
  });

  it("Affiche les films et la pagination", () => {
    cy.contains("Découvrir des films").should("exist");
    cy.get(".MuiPagination-ul").should("exist");
  });

  it("Permet de rechercher un film", () => {
    cy.get("input[label='Rechercher un film']").type("Batman");
    cy.get("button").contains("search", { matchCase: false }).click();
    cy.wait(1000);
    cy.get(".MuiCard-root").should("exist");
  });

  it("Change le nombre de films affichés par page", () => {
    cy.get("label").contains("Par page").parent().click();
    cy.get("ul[role='listbox'] > li").contains("50").click();
    cy.get(".MuiCard-root").should("have.length.greaterThan", 25);
  });

  it("Accède à une page précise via l'URL", () => {
    cy.visit("/movies?page=3");
    cy.url().should("include", "page=3");
    cy.get(".MuiPagination-ul")
      .contains("3")
      .should("have.attr", "aria-current", "true");
  });
});
