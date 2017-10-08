module Pages.Code exposing (code)

import SharedStyles exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


{ id, class, classList } =
    mainNamespace


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
