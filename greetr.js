;( function( global, $ ){

    /* Init "new" main object with helper method: init */
    const Greetr = function( firstName, lastName, language ){
        return new Greetr.init( firstName, lastName, language );
    }

    /* Hidden within the scope of the IIFE and never directly accesible */
    const supportedLangs = ['en', 'es'];
    const greetings = {
        en: 'Hello',
        es: 'Hola',
    };
    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
    };
    const logMessages = {
        en: 'Logged in',
        es: 'Inició sesión',
    };

    /* 
        Prototype holds methods (to save memory space) 
        'this' refers to the calling object at execution time
    */
    Greetr.prototype = {

        /* Chainable methods return their own containing object */
        greet: function(formal) {
            /* In case of undefined or null it will be coerced to 'false' */
            const msg = formal ? this.formalGreeting() : this.greeting();

            console.log(msg);
            
            /* Makes the method chainable */
            return this;
        },

        /* Retrieve messages from object by referring to properties using [] syntax */
        greeting: function() {
            return `${greetings[ this.language ]} ${this.firstName}!`;
        },

        formalGreeting: function() {
            return `${formalGreetings[ this.language ]}, ${this.fullName()}`;
        },

        fullName: function(){
            return `${this.firstName} ${this.lastName}`;
        },

        setLang: function( language ){
            /* Set the language */
            this.language = language;

            this.validate();
            
            /* Makes the method chainable */
            return this;
        },

        /* 
            Check that is a valid language
            References the externally inaccessible 'supportedLangs' within the closure
        */
        validate: function(){
            if ( -1 === supportedLangs.indexOf( this.language ) ) {
                throw "Invalid language";
            }
        },   

        log: function(){
            console.log(`${logMessages[ this.language ]}: ${this.fullName()}`);
            
            /* Makes the method chainable */
            return this;
        },

        HTMLGreeting: function( selector, formal ){
            if(!$){
                throw 'jQuery not loaded';
            }
            if( !selector ){
                throw 'Missing jQuery selector';
            }
            
            /* Inject the message in the chosen place in the DOM with jQuery */
            $( selector ).html( formal ? this.formalGreeting() : this.greeting() );

            /* Makes the method chainable */
            return this;
        }
    };

    /* 
        Main object is created here, allowing us to 'new' an object without calling 'new'
        Trick borrowed from jQuery so we don't have to use the 'new' keyword 
    */
    Greetr.init = function( firstName, lastName, language ){

        const self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }

    /* Allow to add methods to main object but using Greetr as more readable for code */
    Greetr.init.prototype = Greetr.prototype;

    /* Attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers */
    global.Greetr = global.G$ = Greetr;

}( window, jQuery ) );