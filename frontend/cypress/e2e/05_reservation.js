describe("Réservation de film", () => {
  before(() => {
    cy.visit("/register");
    cy.get("input").eq(0).clear().type("reserver");
    cy.get("input").eq(1).clear().type("reserver@mail.com");
    cy.get("input").eq(2).clear().type("password123");
    cy.contains("S'inscrire").click();
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[type='email']").type("reserver@mail.com");
    cy.get("input[type='password']").type("password123");
    cy.contains("Se connecter").click();
    cy.url().should("include", "/movies");
  });

  it("Peut réserver un film depuis la page des films", () => {
    cy.contains("Découvrir des films").should("exist");
    cy.get(".MuiCard-root").first().click();
    cy.url().should("include", "/movies/");
    cy.contains("Réserver une séance").click();
    cy.get("input[type='datetime-local']").type("2025-04-11T20:00");
    cy.contains("Confirmer la réservation").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.contains("Prochaine réservation").should("exist");
    cy.contains("A Minecraft Movie").should("exist");
  });
});
