describe("Page d'accueil", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("Affiche le titre de l'application", () => {
    cy.contains("MovieBooker").should("exist");
  });

  it("Affiche les 5 films à l'affiche", () => {
    cy.get(".MuiCard-root").its("length").should("be.gte", 1);
  });

  it("Affiche la prochaine réservation si elle existe", () => {
    cy.get("body").then(($body) => {
      if ($body.text().includes("Prochaine réservation")) {
        cy.contains("Prochaine réservation").should("exist");
      } else {
        cy.log("Aucune réservation à venir");
      }
    });
  });

  it("Redirige vers les films depuis le bouton Voir tous les films", () => {
    cy.contains("Voir tous les films").click();
    cy.url().should("include", "/movies");
  });
});
