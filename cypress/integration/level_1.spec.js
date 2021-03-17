describe("Level 1: Input fields clear", () => {
    it("Displays the data", () => {
        cy.visit("http://localhost:3000/");

        cy.get('[data-testid="programmingLanguage"]').select("Python");

        cy.get('[data-testid="findJobsButton"]').click();

        cy.get('[data-testid="programmingLanguage"]').should("have.value", "");
    }