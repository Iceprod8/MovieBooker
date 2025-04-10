describe("Connexion utilisateur", () => {
  before(() => {
    cy.visit("/register");
    cy.get("input").eq(0).clear().type("demo");
    cy.get("input").eq(1).clear().type("demo@mail.com");
    cy.get("input").eq(2).clear().type("password123");
    cy.contains("S'inscrire").click();
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  it("Affiche le formulaire de connexion", () => {
    cy.contains("Connexion").should("exist");
    cy.get("input[type='email']").should("exist");
    cy.get("input[type='password']").should("exist");
  });

  it("Affiche une erreur si identifiants invalides", () => {
    cy.get("input[type='email']").type("fake@mail.com");
    cy.get("input[type='password']").type("wrongpassword");
    cy.contains("Se connecter").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contain("Erreur de login");
    });
  });

  it("Connexion avec compte valide redirige vers les films", () => {
    cy.get("input[type='email']").type("demo@mail.com");
    cy.get("input[type='password']").type("password123");
    cy.contains("Se connecter").click();

    cy.url().should("include", "/movies");
    cy.contains("Découvrir des films").should("exist");
  });
});
