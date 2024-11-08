    //VARIABLES ACCESIBLES
    let squares, Track, span, p, h4, button;
    let maxChances = 3;
    let chance = 0;
    let score = 0;
    let CorrectOption, CorrectOptionIndex;
    
    //CARGA DE JAVASCRIPT EN LA WEB
    window.onload = function() //Inicialización del programa tras la carga statica de la web
    {
        //DECLARACIÓN DE LAS VARIABLES GLOBALES
        squares = document.getElementsByClassName("square");
        Track = document.querySelector('h1');
        span = document.querySelector('span');
        p = document.querySelector('p');
        h4 = document.querySelector('h4');
        button = document.getElementsByTagName("button");

        //Configuración de eventos iniciales
        button[0].addEventListener("click", ChangeColors); // Solo se añade una vez
        button[1].addEventListener("click", GamemodeEasy);
        button[2].addEventListener("click", GamemodeHard);
        button[3].addEventListener("click", ResetGame);

        //ฅᨐฅ-------------------------------------------------------------------------------------------------------------------------ฅᨐฅ
        //PROGRAMA
        StartGame();
    }

    //ฅᨐฅ-------------------------------------------------------------------------------------------------------------------------ฅᨐฅ
    //DECLARACIÓN DE FUNCIONES
    function ResetEventListener() //Nos evita acumulación de eventos
    {
        for (let i = 0; i < button.length; i++) 
        {
            button[i].removeEventListener("click", ChangeColors);
            button[i].removeEventListener("click", ChangeTones);
            button[i].removeEventListener("click", GamemodeEasy);
            button[i].removeEventListener("click", GamemodeHard);
        }
    }

    function StartGame()
    {
        // Restablece el estado del juego
        chance = 0;
        score = 0;
        span.innerHTML = ""; // Restablece mensajes
        p.style.opacity = 0; // Oculta instrucciones
        button[0].style.pointerEvents = "none";

        // Configura el texto del encabezado según el modo
        button[1].onclick = () => 
            {
                h4.innerHTML = "On: Easy mode";
                GamemodeEasy();
            };

        button[2].onclick = () => 
            {
                h4.innerHTML = "On: Hard mode";
                GamemodeHard();
            };
    }

    function ResetGame()
    {
        chance = 0; // Reiniciar el número de intentos
        score = 0; // Reiniciar el puntaje
        span.innerHTML = ""; // Limpiar mensajes
        Track.innerHTML = "Elige un modo de juego"; // Mensaje de reset
        button[0].style.opacity = 0;
        button[0].style.pointerEvents = "none";

        // Limpia los colores de los cuadrados
        for (let i = 0; i < squares.length; i++) 
        {
            squares[i].style.background = ""; // O cualquier color predeterminado
            squares[i].style.opacity = 1;
            squares[i].style.boxShadow = "";
        }

        enableSquareClicks();
    }

    // Desactivar clics en los cuadrados
    function disableSquareClicks() 
    {
        for (let i = 0; i < squares.length; i++) 
        {
            squares[i].style.pointerEvents = "none"; // Desactiva la interacción
        }
    }

    // Activar clics en los cuadrados
    function enableSquareClicks() 
    {
        for (let i = 0; i < squares.length; i++) 
        {
            squares[i].style.pointerEvents = "auto"; // Activa la interacción
        }
    }

    function ChangeColors()
    {
        ResetSquaresVisibility();
        ResetEventListener();
        button[0].addEventListener("click", ChangeColors);

        CorrectOptionIndex = Math.floor(Math.random() * squares.length);
        CorrectOption = squares[CorrectOptionIndex];

        let PreviousOption = CorrectOption.style.background;

        for(let i=0;i < squares.length;i++)
        {
            var RgbR = Math.floor(Math.random() * 255);
            var RgbG = Math.floor(Math.random() * 255);
            var RgbB = Math.floor(Math.random() * 255);
            squares[i].style.background= `rgb(${RgbR}, ${RgbG}, ${RgbB})`;
        }
        console.log("The correct option is:" + (CorrectOptionIndex + 1));
        Track.innerHTML = CorrectOption.style.background;
        Track.style.color= PreviousOption;
        span.innerHTML = "";
    }

    function ChangeTones()
    {
        ResetSquaresVisibility();
        ResetEventListener();
        button[0].addEventListener("click", ChangeColors);

        CorrectOptionIndex = Math.floor(Math.random() * squares.length);
        CorrectOption = squares[CorrectOptionIndex];

        let PreviousOption = CorrectOption.style.background;
        const Color1 = Math.floor(Math.random() * 256);
        const Color2 = Math.floor(Math.random() * 256);
        const Color3 = Math.floor(Math.random() * 256);

        let tonesSet = new Set(); // Use a set to track unique tones
        for(let i = 0; i < squares.length; i++) {
            let tone;
            do 
            {
                tone = `rgb(${Math.min(255, Color1 + Math.floor(Math.random() * 100) - 50)}, ${Color2}, ${Color3})`;
            } while (tonesSet.has(tone));

            tonesSet.add(tone);
            squares[i].style.background = tone;
        }
        
        console.log("The correct option is: " + (CorrectOptionIndex + 1));
        Track.innerHTML = CorrectOption.style.background;
        Track.style.color = PreviousOption;
        span.innerHTML = "";
    }

    function showSuccessMessage() 
    {
        span.innerHTML = "You got it right!";
        span.style.color = "rgb(253, 174, 27)";
        p.innerHTML = "Press the 'News Color' button again to play again.";
        p.style.opacity = 1;
        squares[CorrectOptionIndex].style.boxShadow = "0.1em 0.1em 0em 0.7em,-0.1em -0.1em 0em 0.7em rgb(55, 255, 0)";
        chance = 0;
        Score();
    }

    function showLossMessage() 
    {
        span.innerHTML = "You lost. The correct choice was the color: " + (CorrectOptionIndex + 1);
        span.style.color = "red";
        p.innerHTML = "Press the 'News Color' button again to play again.";
        p.style.opacity = 1;
        squares[CorrectOptionIndex].style.boxShadow = "0.1em 0.1em 0.3em 0.7em, -0.1em -0.1em 0.3em 0.7em rgb(55, 255, 0)";
    }

    function Comparator(option)
    {
        if (option.style.background === CorrectOption.style.background) {
            showSuccessMessage();
            disableSquareClicks();
        } 
        else 
        {
            chance++;
            if (chance >= maxChances) 
            {
                showLossMessage();
                disableSquareClicks();
            } 
            else 
            {
                span.innerHTML = "Incorrecto, intenta de nuevo!";
                option.style.opacity = 0; // Desaparece el color incorrecto
            }
        }
    }

    function GamemodeEasy()
    {
        ResetEventListener();
        button[0].style.opacity = 1;
        button[0].style.pointerEvents = "auto";

        button[0].addEventListener("click", () => 
            {
                ChangeColors();
                p.style.opacity = 0;
            });

        for (let i = 0; i < squares.length; i++) 
            {
                squares[i].addEventListener("click", () => 
                {
                        Comparator(squares[i]);
                });
            }
        
        enableSquareClicks();
        ChangeColors();
    }

    function GamemodeHard()
    {
        ResetEventListener();
        button[0].style.opacity = 1;
        button[0].style.pointerEvents = "auto";
        
        button[0].addEventListener("click", () => 
            {
                ChangeTones();
                p.style.opacity = 0;
            });

        for (let i = 0; i < squares.length; i++) 
            {
                squares[i].addEventListener("click", () => 
                {
                        Comparator(squares[i]);
                });
            }
            
        enableSquareClicks();
        ChangeTones();
    }

    function Score()
    {
        score++;
        document.querySelector('.Score').innerHTML = `Puntuación: ${score}`;
    }

    function ResetSquaresVisibility() 
    {
        for (let i = 0; i < squares.length; i++) 
        {
            squares[i].style.opacity = 1; // Establece la opacidad a 1 para hacerlos visibles
            squares[i].style.boxShadow = "";
        }
    }

