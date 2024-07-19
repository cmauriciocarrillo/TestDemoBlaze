describe('Prueba automatizada Mauricio Carrillo', () => {
	let date = new Date()
	let username = `mauric_${date.getTime()}`; //Ingresa usuario con parametro date.getTime() para poder crear siempre un usuario nuevo
	let password = 'mauriciotest'; //Password fijo para todos los usuarios
	let passwordError = 'errorPass'
	let url = 'https://www.demoblaze.com/index.html'
  let signupUrl = 'https://api.demoblaze.com/signup';
  let loginUrl = 'https://api.demoblaze.com/login';

  //------------------------------------------Version API----------------------------------
  // Paso 1 - Intenta crear el usuario con las credenciales precargadas
  it('1. Creación de un nuevo ususario en signup API', () => {
      cy.request('POST', signupUrl, {
          username: username,
          password: password
      }).then((response) => {
          expect(response.status).to.eq(200);
          if ( !response.body?.hasOwnProperty('errorMessage') ) cy.log(`Usuario creado correctamente`);
          else {
              cy.log(`Fallo de la prueba, no se pudo crear el usuario`);
              cy.log(`Detalle del error: ${response.body?.errorMessage ?? 'No se recibió mensaje de error'}`);
          }
      })
  });
	// Paso 2 - Creacion de una cuenta que ya existe
  it('2. Intento de creacion de usuario ya existente API', () => {
      cy.request({
          method: 'POST',
          url: signupUrl,
          body: {
              username: username,
              password: password
          },
          failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
          // Si devuelve un errorMessage es que no se logro el login
          if ( response.body?.errorMessage ) cy.log(`Prueba exitosa. Detalle del error: ${response.body?.errorMessage ?? 'No se recibió mensaje de error'}`);
          else cy.log(`Fallo de la prueba, usuario no existe y creo el usuario`);
      })
  });
	// Paso 3 - Accede a el formulario de inicio de sesion para poder acceder
  it('3. Ingreso de usuario y password correcto en login API', () => {
      cy.request('POST', loginUrl, {
          username: username,
          password: password
      }).then((response) => {
          expect(response.status).to.eq(200)
          // Si devuelve un errorMessage es que no se logro el login
          if ( !response.body?.hasOwnProperty('errorMessage') ) {
              cy.log(`Login exitoso`)
              if ( response.body?.includes('Auth_token') ) cy.log(`Token: ${response.body}`);
              else cy.log(`Fallo de la prueba, no se recibió token`);
          } else cy.log(`Fallo de la prueba, detalle del error: ${response.body?.errorMessage ?? 'No se recibió mensaje de error'}`);
      });
  });
	// Paso 4 - Intenta acceder con contraseña incorrecta
  it('4. Ingreso de usuario y password incorrecto en login API ', () => {
      cy.request({
          method: 'POST',
          url: loginUrl,
          body: {
              username: username,
              password: passwordError
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(200);
          // Si devuelve un errorMessage es que no se logro el login
          if ( response.body?.errorMessage ) cy.log(`Detalle del error: ${response.body?.errorMessage ?? 'No se recibió mensaje de error'}`);
          else cy.log(`Fallo de la prueba, usuario ya existe`);
      });
  });


  //------------------------------------------Version WEB----------------------------------

	// Paso 1 - Intenta crear el usuario con las credenciales precargadas
	it('1. Creación de un nuevo ususario en signup WEB', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(password);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();    
	});

	// Paso 2 - Creacion de una cuenta que ya existe
	it('2. Intento de creacion de usuario ya existente WEB', () => {
		cy.visit(url);
		cy.get('#signin2').click();
		cy.get('#sign-username').type(username);
		cy.get('#sign-password').type(password);
		cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});

	// Paso 3 - Accede a el formulario de inicio de sesion para poder acceder
	it('3. Ingreso de usuario y password correcto en login WEB', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(password);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});

	// Paso 4 - Intenta acceder con contraseña incorrecta
	it('4. Ingreso de usuario y password incorrecto en login WEB', () => {
		cy.visit(url);
		cy.get('#login2').click();
		cy.get('#loginusername').type(username);
		cy.get('#loginpassword').type(passwordError);
		cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
	});
});