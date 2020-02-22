$('#login').click( function(){

    const language = $('#lang').val(),
        firstName = $('#firstName').val(),
        lastName = $('#lastName').val();

    /* hide the login on the screen after click on the login button */
    $('#logindiv').hide();

    /* 
        Gets a new object and use our chainable methods
        ( the architecture allows us to not have to use the 'new' kewyword here ) 
    */
    G$( firstName, lastName )
        .setLang( language )
        .HTMLGreeting( '#greeting', true )
        .log();
});