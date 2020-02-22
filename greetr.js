;( function( global, $ ){

    const Greetr = function( firstName, lastName, language ){
        return new Greetr.init( firstName, lastName, language );
    }

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

    Greetr.prototype = {

        greet: function(formal) {
            const msg = formal ? this.formalGreeting() : this.greeting();

            console.log(msg);
            
            //makes the method chainable
            // 'this' refers to the calling object at execution time
            return this;
        },

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
            this.language = language;

            this.validate();

            return this;
        },

        validate: function(){
            if ( -1 === supportedLangs.indexOf( this.language ) ) {
                throw "Invalid language";
            }
        },   

        log: function(){
            console.log(`${logMessages[ this.language ]}: ${this.fullName()}`);
            
            return this;
        },

        HTMLGreeting: function( selector, formal ){
            if(!$){
                throw 'jQuery not loaded';
            }
            if( !selector ){
                throw 'Missing jQuery selector';
            }
            
            $( selector ).html( formal ? this.formalGreeting() : this.greeting() );

            return this;
        }
    };

    Greetr.init = function( firstName, lastName, language ){

        const self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

}( window, jQuery ) );