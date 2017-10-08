module Pages.NotFound exposing (notFound)

import SharedStyles exposing (..)
import Html exposing (..)


{ id, class, classList } =
    mainNamespace


notFound : Html msg
notFound =
    div [ class [ Page ] ]
        [ h1 [] [ text ("Page Not Found") ]
        ]
