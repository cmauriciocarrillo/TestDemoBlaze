describe('Prueba automatiza Muaricio Carrillo', () => {
	let date = new Date()
	let username = `mauric_${date.getTime()}`;
	let password = 'mauriciotest';
	let passwordError = 'errorPass'
	let url = 'https://www.demoblaze.com/index.html'

	// Paso 1 - Intenta crear el usuario con las credenciales precargadas
	it('Intento de creacion de usuario', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(password);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});

	// Paso 2 - Creacion de una cuenta que ya existe
	it('Intentar de creacion de usuario existente', () => {
		cy.visit(url);
		cy.get('#signin2').click();
		cy.get('#sign-username').type(username);
		cy.get('#sign-password').type(password);
		cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});

	// Paso 3 - Accede a el formulario de inicio de sesion para poder acceder
	it('Intento de inicio de sesion', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(password);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});

	// Paso 4 - Intenta acceder con contraseña incorrecta
	it('Intento de logearse con usuario y password erroneo', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(passwordError);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});
});