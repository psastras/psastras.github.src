module Pages.Code exposing (..)

import SharedStyles exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


{ id, class, classList } =
    mainNamespace



-- MODEL


type alias Model =
    { status : String }


init : Model
init =
    { status = "Not Loaded" }


onLoad : Model
onLoad =
    let
        _ =
            Debug.log "Loaded code page"
    in
        { status = "Loaded" }



-- VIEW


code : Html msg
code =
    div [ class [ Page ] ]
        [ div [ class [ PageContent ] ]
            [ div [ class [ PageContentText ] ]
                [ h1 [] [ text ("Code") ]
                , p []
                    [ text ("This website is written in Elm, a purely functional, statically typed language.  Its source code is available on ")
                    , a [ href "https://github.com/psastras/psastras.github.src" ] [ text ("Github") ]
                    , text (".")
                    ]
                , h2 [] [ text ("License") ]
                , p [] [ text ("The source code for this website is released under the MIT License.") ]
                ]
            ]
        ]
