/*global cy*/
describe("Testing our form", ()=>{
    beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });
    it("Finds the inputs", ()=>{
        //Arrange - grab the element
        //Assert - verify expected output
        //Act - emulate user interact
        cy.get('#name')
            .type("Randy")
            .should("have.value", "Randy")
            .clear();
        cy.contains("Name is a required field");
        cy.get('#formSubmitBtn').should("be.disabled");//check if the button is properly disabled
        cy.get("#name").type("Randy");
        cy.get("#email")
            .type("randy@randalegan.com")
            .should("have.value", "randy@randalegan.com");
        cy.get("#password")
            .type("SuperSecretPasswordOfDoom")
            .should("have.value", "SuperSecretPasswordOfDoom");
        cy.get('#tos').check().should("be.checked");
        cy.get('#formSubmitBtn')
            .should("not.be.disabled")//check if button is abled again
            .click();
        cy.contains("{\n" +
            "  \"name\": \"Randy\",\n" +
            "  \"email\": \"randy@randalegan.com\",\n" +
            "  \"password\": \"SuperSecretPasswordOfDoom\",\n" +
            "  \"tos\": true,");

    });
});