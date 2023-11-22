const testUrl = "http://localhost:3000";
const ingredient = 'div[data-testid="ingttt"]';
const closeModal = 'div[data-testid="modal"]';
const closePopup = 'div[data-testid="modal"]';
const dropTarget = 'div[data-testid="dropTarget"]';
const name = "Дарья";
const email = "daria.tsenina@gmail.com";
const password = "zgate29";

describe("service is available", function () {
    beforeEach(function () {
        cy.viewport(1920, 1024);
    });
    it("should be available on localhost:3000", function () {
        cy.visit(testUrl);
    });
    it("Open pop-up ingredient", function () {
        cy.visit(testUrl);
        cy.get('a[href*="ingredients"]').first().as('ingredient');
        cy.get('@ingredient').click();
        cy.get('[class^=modal_header]').as('close');
        cy.wait(2000).get('@close').click();
    });
    it("User journey from dragging ingredients to order", function () {
        cy.visit(testUrl);
        cy.get('a[href*="ingredients"]').first().as('ingredient');
        cy.get('[class^=burger-constructor_constructor__content__]').as('dropTarget');
        cy.get('li').contains('Соус фирменный Space Sauce').as('sauce');
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').as('main');


        cy.get('@ingredient').trigger("dragstart");
        cy.get('@dropTarget').trigger("drop");
        cy.get('@sauce').trigger("dragstart");
        cy.get('@dropTarget').trigger("drop");
        cy.get('@main').trigger("dragstart");
        cy.get('@dropTarget').trigger("drop");

        cy.get('[class^="constructor-element__action pr-2"]').eq(3).click();
        cy.get('[class^="constructor-element__action pr-2"]').eq(2).click();
        cy.get("button").contains("Оформить заказ").click();
        //cy.get("a").contains("Зарегистрироваться").click();


        // cy.get('input').as('input');
        // cy.get('[type=email]').as('email');
        // cy.get('@input').first().type(name);
        // cy.get('@email').type(email);
        // cy.get('@input').last().type(password);
        // cy.get("button").contains("Зарегистрироваться").click();

        cy.get('input').as('input');
        cy.get('@input').first().type(email);
        cy.get('@input').last().type(password);
        cy.get("button").contains("Войти").click();

        cy.get("button").contains("Оформить заказ").click();

        cy.get('[class^=modal_header]').as('close');
        cy.get('@close').click();
    });
});
